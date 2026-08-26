import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { assets } from '../assets/assets.js';
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
            <div className={'sm:mx-[11%] bg-[#0C0E12]'}>
                {/*   Doctor Details */}
                <div className={'flex flex-col sm:flex-row gap-4'}>
                    <div>
                        <img
                            className={
                                'bg-[#16191F] w-full sm:max-w-72 rounded-lg'
                            }
                            src={docInfo.image}
                            alt={'image'}
                        />
                    </div>
                    <div
                        className={
                            'flex-1 border border-[#2E333B] rounded-lg p-8 py-7 bg-[#16191F] mx-2 sm:mx-0 mt-[-80px] sm:mt-0'
                        }
                    >
                        {/*  Doc Info : name, degree. experience  */}
                        <p
                            className={
                                'flex items-center gap-2 text-2xl font-medium text-[#F5F3EE]'
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
                                'flex items-center gap-2 text-sm text-[#9AA0A8] mt-1'
                            }
                        >
                            <p>
                                {docInfo.degree} -{' '}
                                {docInfo.speciality.join(', ')}
                            </p>
                            <button
                                className={
                                    'py-0.5 px-2 border border-[#2E333B] text-xs rounded-full'
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
                                        'text-sm text-[#F5F3EE] font-medium mb-1'
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
                                        'border border-[#2E333B] bg-[#0C0E12] rounded px-3 py-1.5 text-sm text-[#F5F3EE]'
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
                                    'flex items-center gap-1 text-sm font-medium text-[#F5F3EE] mt-3'
                                }
                            >
                                About
                                <img src={assets.info_icon} alt={'info'} />
                            </p>
                            <p
                                className={
                                    'text-sm text-[#9AA0A8] max-w-[700px] mt-1'
                                }
                            >
                                {docInfo.about}
                            </p>
                        </div>
                        <p className={'text-[#9AA0A8] font-medium mt-5'}>
                            Appointment fee :{' '}
                            <span className={'text-[#F5F3EE]'}>
                                {currencySymbol}
                                {docInfo.fees}
                            </span>
                        </p>
                    </div>
                </div>

                {/*  Booking slots  */}

                <div
                    className={
                        'sm:ml-72 sm:pl-4 mt-4 font-medium text-[#F5F3EE]'
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
                                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#FF4B2E] text-[#0C0E12]' : 'bg-[#16191F] text-[#F5F3EE] border border-[#2E333B]'}`}
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
                                    className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-[#FF4B2E] text-[#0C0E12]' : 'text-[#9AA0A8] border border-[#2E333B]'}`}
                                    key={index}
                                >
                                    {item.time.toLowerCase()}
                                </p>
                            ))}
                    </div>
                    <button
                        onClick={bookAppointment}
                        className={
                            'bg-[#FF4B2E] text-[#0C0E12] text-sm font-semibold px-14 py-3 rounded-full my-6 hover:scale-[1.02] transition-transform duration-300'
                        }
                    >
                        Book an appointment
                    </button>
                </div>
                {/*    Listing related doctors */}
                {/*<RelatedDoctors docId={docId} speciality={docInfo.speciality} />*/}
            </div>
        )
    );
};

export default Appointment;
