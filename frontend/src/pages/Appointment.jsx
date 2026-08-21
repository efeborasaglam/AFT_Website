import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { assets } from '../assets/assets.js';
import RelatedDoctors from '../components/RelatedDoctors.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
    const { docId } = useParams();
    const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
        useContext(AppContext);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const navigate = useNavigate();

    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');
    const [selectedSpeciality, setSelectedSpeciality] = useState('');

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId);
        setDocInfo(docInfo);
        console.log(docInfo);
    };

    const getAvailableSlots = async () => {
        setDocSlots([]);

        let today = new Date();

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(
                    currentDate.getHours() > 10
                        ? currentDate.getHours() + 1
                        : 10
                );
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                });

                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();

                const slotDate = day + '_' + month + '_' + year;
                const slotTime = formattedTime;

                const isSlotAvailable =
                    docInfo.slots_booked[slotDate] &&
                    docInfo.slots_booked[slotDate].includes(slotTime)
                        ? false
                        : true;

                if (
                    isSlotAvailable &&
                    isWithinAvailability(currentDate, selectedSpeciality)
                ) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime,
                    });
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            // ⬇️ Wichtig: timeSlots als EIN Element (Array pro Tag) hinzufügen
            setDocSlots((prevSlots) => [...prevSlots, timeSlots]);
        }
    };

    const bookAppointment = async () => {
        if (!token) {
            toast.warn('Login to book appointment');
            return navigate('/login');
        }

        if (!selectedSpeciality) {
            return toast.warn(
                'Please select a speciality for this appointment'
            );
        }

        try {
            const date = docSlots[slotIndex][0].datetime;

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            const slotDate = day + '_' + month + '_' + year;

            const { data } = await axios.post(
                backendUrl + '/api/user/book-appointment',
                { docId, slotDate, slotTime, speciality: selectedSpeciality },
                {
                    headers: {
                        token,
                    },
                }
            );

            if (data.success) {
                toast.success(data.message);
                getDoctorsData();
                navigate('/my-appointments');
            } else {
                toast.error(data.message);
            }
        } catch (e) {
            console.log(e);
            toast.error(e.message);
        }
    };

    const toDateStr = (d) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    };

    const isWithinAvailability = (date, speciality) => {
        if (!docInfo.availability || docInfo.availability.length === 0) {
            return true; // Fallback: nichts eingetragen -> keine Einschränkung
        }

        const dateStr = toDateStr(date);
        const timeStr = date.toTimeString().slice(0, 5);

        return docInfo.availability.some(
            (a) =>
                a.speciality === speciality &&
                a.date === dateStr &&
                timeStr >= a.startTime &&
                timeStr < a.endTime
        );
    };

    useEffect(() => {
        fetchDocInfo();
    }, [doctors, docId]);

    useEffect(() => {
        getAvailableSlots();
    }, [docInfo]);

    useEffect(() => {
        if (docInfo && docInfo.speciality?.length) {
            setSelectedSpeciality(docInfo.speciality[0]);
        }
    }, [docInfo]);

    useEffect(() => {
        console.log(docSlots);
    }, [docSlots]);

    useEffect(() => {
        if (docInfo && selectedSpeciality) {
            getAvailableSlots();
        }
    }, [docInfo, selectedSpeciality]);

    return (
        docInfo && (
            <div>
                {/*   Doctor Details */}
                <div className={'flex flex-col sm:flex-row gap-4'}>
                    <div>
                        <img
                            className={
                                'bg-primary w-full sm:max-w-72 rounded-lg'
                            }
                            src={docInfo.image}
                            alt={'image'}
                        />
                    </div>
                    <div
                        className={
                            'flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'
                        }
                    >
                        {/*  Doc Info : name, degree. experience  */}
                        <p
                            className={
                                'flex items-center gap-2 text-2xl font-medium text-gray-900'
                            }
                        >
                            {docInfo.name}{' '}
                            <img
                                className={'w-5'}
                                src={assets.verified_icon}
                                alt={'verify'}
                            />
                        </p>
                        <div
                            className={
                                'flex items-center gap-2 text-sm text-gray-600 mt-1'
                            }
                        >
                            <p>
                                {docInfo.degree} -{' '}
                                {docInfo.speciality.join(', ')}
                            </p>
                            <button
                                className={
                                    'py-0.5 px-2 border text-xs rounded-full'
                                }
                            >
                                {docInfo.experience}
                            </button>
                        </div>
                        {/* Speciality-Auswahl für diesen Termin */}
                        {docInfo.speciality.length > 1 && (
                            <div className={'mt-3'}>
                                <p
                                    className={
                                        'text-sm text-gray-700 font-medium mb-1'
                                    }
                                >
                                    Select speciality for this appointment
                                </p>
                                <select
                                    value={selectedSpeciality}
                                    onChange={(e) =>
                                        setSelectedSpeciality(e.target.value)
                                    }
                                    className={
                                        'border rounded px-3 py-1.5 text-sm text-gray-700'
                                    }
                                >
                                    {docInfo.speciality.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {/*  Doctor About  */}

                        <div>
                            <p
                                className={
                                    'flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'
                                }
                            >
                                About
                                <img src={assets.info_icon} alt={'info'} />
                            </p>
                            <p
                                className={
                                    'text-sm text-gray-500 max-w-[700px] mt-1'
                                }
                            >
                                {docInfo.about}
                            </p>
                        </div>
                        <p className={'text-gray-500 font-medium mt-5'}>
                            Appointment fee :{' '}
                            <span className={'text-gray-600'}>
                                {currencySymbol}
                                {docInfo.fees}
                            </span>
                        </p>
                    </div>
                </div>

                {/*  Booking slots  */}

                <div
                    className={
                        'sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'
                    }
                >
                    <p>Booking slots</p>
                    <div
                        className={
                            'flex gap-3 items-center w-full overflow-x-scroll mt-4'
                        }
                    >
                        {docSlots.length &&
                            docSlots.map((item, index) => (
                                <div
                                    onClick={() => setSlotIndex(index)}
                                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'bg-white text-black border border-gray-400 '}`}
                                >
                                    <p>
                                        {item[0] &&
                                            daysOfWeek[
                                                item[0].datetime.getDay()
                                            ]}
                                    </p>
                                    <p>
                                        {item[0] && item[0].datetime.getDate()}
                                    </p>
                                </div>
                            ))}
                    </div>
                    <div
                        className={
                            'flex items-center gap-3 w-full overflow-x-scroll mt-4'
                        }
                    >
                        {docSlots.length &&
                            docSlots[slotIndex].map((item, index) => (
                                <p
                                    onClick={() => setSlotTime(item.time)}
                                    className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}
                                    key={index}
                                >
                                    {item.time.toLowerCase()}
                                </p>
                            ))}
                    </div>
                    <button
                        onClick={bookAppointment}
                        className={
                            'bg-primary text-white text-sm font-light px-14 py-3 rounded-fully my-6'
                        }
                    >
                        Book an appointment
                    </button>
                </div>
                {/*    Listing related doctors */}
                <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
            </div>
        )
    );
};

export default Appointment;
