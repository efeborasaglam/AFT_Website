import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { assets } from '../assets/assets.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Appointment = () => {
    const { docId } = useParams();
    const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
        useContext(AppContext);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [docInfo, setDocInfo] = useState(null);
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const [blocksByDate, setBlocksByDate] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedBlockId, setSelectedBlockId] = useState('');

    const specialityKeyMap = {
        'Individual athletic training sessions':
            'speciality.individualathltetic',
        'Group Athletic Training': 'speciality.groupathletic',
        'Online-Coaching': 'speciality.online',
        'Digital Programs': 'speciality.digital',
    };

    const fetchDocInfo = async () => {
        const info = doctors.find((doc) => doc._id === docId);
        setDocInfo(info);
    };

    const buildAvailableBlocks = () => {
        if (!docInfo) return;

        const now = new Date();
        const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

        const upcoming = (docInfo.availability || [])
            .filter((a) => a.speciality === selectedSpeciality)
            .filter((a) => a.date >= todayStr)
            .filter((a) => new Date(`${a.date}T${a.startTime}:00`) >= now)
            .sort((a, b) =>
                (a.date + a.startTime).localeCompare(b.date + b.startTime)
            );

        const grouped = [];
        upcoming.forEach((a) => {
            let dayEntry = grouped.find((g) => g.date === a.date);
            if (!dayEntry) {
                dayEntry = { date: a.date, blocks: [] };
                grouped.push(dayEntry);
            }
            dayEntry.blocks.push(a);
        });

        setBlocksByDate(grouped);
        setSelectedDate(grouped[0]?.date || '');
        setSelectedBlockId('');
    };

    const bookAppointment = async () => {
        if (!token) {
            toast.warn('Login to book appointment');
            return navigate('/login');
        }
        if (!selectedBlockId) return toast.warn('Bitte einen Termin auswählen');

        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/book-appointment',
                { docId, availabilityId: selectedBlockId },
                { headers: { token } }
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

    useEffect(() => {
        fetchDocInfo();
    }, [doctors, docId]);
    useEffect(() => {
        if (docInfo && docInfo.speciality?.length)
            setSelectedSpeciality(docInfo.speciality[0]);
    }, [docInfo]);
    useEffect(() => {
        if (docInfo && selectedSpeciality) buildAvailableBlocks();
    }, [docInfo, selectedSpeciality]);

    const currentDayBlocks =
        blocksByDate.find((g) => g.date === selectedDate)?.blocks || [];

    return (
        docInfo && (
            <div className={'sm:mx-[11%] bg-[#0C0E12]'}>
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
                                {docInfo.speciality
                                    .map((s) =>
                                        s ===
                                        'Individual athletic training sessions'
                                            ? t(
                                                  'speciality.individualathltetic'
                                              )
                                            : s === 'Group Athletic Training'
                                              ? t('speciality.groupathletic')
                                              : s === 'Online-Coaching'
                                                ? t('speciality.online')
                                                : t('speciality.digital')
                                    )
                                    .join(', ')}
                            </p>
                            <button
                                className={
                                    'py-0.5 px-2 border border-[#2E333B] text-xs rounded-full'
                                }
                            >
                                {docInfo.experience}
                            </button>
                        </div>
                        {docInfo.speciality.length > 1 && (
                            <div className={'mt-3'}>
                                <p
                                    className={
                                        'text-sm text-[#F5F3EE] font-medium mb-1'
                                    }
                                >
                                    {t('appointment.select')}
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
                                            {t(specialityKeyMap[s] || s)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div>
                            <p
                                className={
                                    'flex items-center gap-1 text-sm font-medium text-[#F5F3EE] mt-3'
                                }
                            >
                                {t('navbar.about')}
                                <img src={assets.info_icon} alt={'info'} />
                            </p>
                            <p
                                className={
                                    'text-sm text-[#9AA0A8] max-w-[700px] mt-1'
                                }
                            >
                                {t('trainer.descr')}
                            </p>
                        </div>
                        <p className={'text-[#9AA0A8] font-medium mt-5'}>
                            {t('appointment.fee')}:{' '}
                            <span className={'text-[#F5F3EE]'}>
                                {currencySymbol}
                                {docInfo.fees}
                            </span>
                        </p>
                    </div>
                </div>

                <div
                    className={
                        'sm:ml-72 sm:pl-4 mt-4 font-medium text-[#F5F3EE]'
                    }
                >
                    <p>{t('appointment.bookings')}</p>

                    {selectedSpeciality === 'Online-Coaching' ? (
                        <div
                            className={
                                'flex flex-col items-center justify-center text-center border border-[#2E333B] rounded-lg py-10 mt-4 bg-[#16191F]'
                            }
                        >
                            <p
                                className={
                                    'text-lg font-semibold text-[#F5F3EE]'
                                }
                            >
                                Coming Soon
                            </p>
                            <p
                                className={
                                    'text-sm text-[#9AA0A8] mt-1 max-w-[400px]'
                                }
                            >
                                {t('appointment.comingsoon.descr')}
                            </p>
                        </div>
                    ) : (
                        <>
                            {blocksByDate.length === 0 && (
                                <p className={'text-sm text-[#9AA0A8] mt-3'}>
                                    {t('appointment.bookings.descr')}
                                </p>
                            )}

                            <div
                                className={
                                    'flex gap-3 items-center w-full overflow-x-scroll mt-4'
                                }
                            >
                                {blocksByDate.map((g) => {
                                    const d = new Date(g.date + 'T00:00:00');
                                    return (
                                        <div
                                            key={g.date}
                                            onClick={() => {
                                                setSelectedDate(g.date);
                                                setSelectedBlockId('');
                                            }}
                                            className={`text-center py-3 px-4 min-w-16 rounded-full cursor-pointer ${selectedDate === g.date ? 'bg-[#FF4B2E] text-[#0C0E12]' : 'bg-[#16191F] text-[#F5F3EE] border border-[#2E333B]'}`}
                                        >
                                            <p className={'text-xs'}>
                                                {d.toLocaleDateString('de-DE', {
                                                    weekday: 'short',
                                                })}
                                            </p>
                                            <p>
                                                {d.getDate()}.{d.getMonth() + 1}
                                                .
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className={'flex flex-col gap-2 w-full mt-4'}>
                                {currentDayBlocks.map((b) => {
                                    const spotsLeft =
                                        (b.maxParticipants || 1) -
                                        (b.bookedCount || 0);
                                    const isFull = spotsLeft <= 0;
                                    return (
                                        <div
                                            key={b._id}
                                            onClick={() =>
                                                !isFull &&
                                                setSelectedBlockId(b._id)
                                            }
                                            className={`flex justify-between items-center px-5 py-3 rounded-lg border ${
                                                isFull
                                                    ? 'opacity-40 cursor-not-allowed border-[#2E333B]'
                                                    : selectedBlockId === b._id
                                                      ? 'bg-[#FF4B2E] text-[#0C0E12] border-[#FF4B2E] cursor-pointer'
                                                      : 'border-[#2E333B] cursor-pointer'
                                            }`}
                                        >
                                            <span>
                                                {b.startTime} - {b.endTime}
                                            </span>
                                            {b.ageGroup && (
                                                <span className={'text-xs'}>
                                                    {b.ageGroup}
                                                </span>
                                            )}
                                            <span className={'text-xs'}>
                                                {isFull
                                                    ? t('spots available')
                                                    : `${spotsLeft} ${t('appointment.free')}`}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                onClick={bookAppointment}
                                disabled={!selectedBlockId}
                                className={
                                    'bg-[#FF4B2E] text-[#0C0E12] text-sm font-semibold px-14 py-3 rounded-full my-6 hover:scale-[1.02] transition-transform duration-300 disabled:opacity-40'
                                }
                            >
                                {t('home.main.button')}
                            </button>
                        </>
                    )}
                </div>
            </div>
        )
    );
};

export default Appointment;
