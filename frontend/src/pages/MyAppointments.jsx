import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
    const { backendUrl, token, getDoctorsData } = useContext(AppContext);

    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const months = [
        ' ',
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    const slotDateFormate = (slotDate) => {
        const dateArray = slotDate.split('_');
        return (
            dateArray[0] +
            ' ' +
            months[Number(dateArray[1])] +
            ' ' +
            dateArray[2]
        );
    };

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + '/api/user/appointments',
                { headers: { token } }
            );
            if (data.success) {
                setAppointments(data.appointments.reverse());
                console.log(data.appointments);
            }
        } catch (e) {
            console.log(e);
            toast.error(e.message);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            console.log(appointmentId);
            const { data } = await axios.post(
                backendUrl + '/api/user/cancel-appointment',
                { appointmentId },
                { headers: { token } }
            );
            if (data.success) {
                toast.success(data.message);
                getUserAppointments();
                getDoctorsData();
            } else {
                toast.error(data.message);
            }
        } catch (e) {
            console.log(e);
            toast.error(e.message);
        }
    };

    // Stripe: statt Popup wird der User auf die von Stripe gehostete Checkout-Seite weitergeleitet
    const AppointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/payment-razorpay', // Route-Pfad bleibt laut Tutorial gleich
                { appointmentId },
                { headers: { token } }
            );
            if (data.success) {
                window.location.replace(data.session_url);
                navigate('/my-appointment');
            } else {
                toast.error(data.message);
            }
        } catch (e) {
            console.log(e);
            toast.error(e.message);
        }
    };

    useEffect(() => {
        if (token) {
            getUserAppointments();
        }
    }, [token]);

    return (
        <div>
            <p className={'pb-3 mt-12 font-medium text-zinc-700 border-b'}>
                My Appointments
            </p>
            <div>
                {appointments.map((item, index) => (
                    <div
                        className={
                            'grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b'
                        }
                        key={index}
                    >
                        <div>
                            <img
                                className={'w-32 bg-indigo-50'}
                                src={item.docData.image}
                                alt={'dco'}
                            />
                        </div>
                        <div className={'flex-1 text-sm text-zinc-600'}>
                            <p className={'text-neutral-800 font-semibold'}>
                                {item.docData.name}
                            </p>
                            <p>{item.speciality}</p>
                            <p className={'text-zinc-700 font-medium mt-1'}>
                                Address:{' '}
                            </p>
                            <p className={'text-xs'}>
                                {item.docData.address?.line1}
                            </p>
                            <p className={'text-xs'}>
                                {item.docData.address?.line2}
                            </p>
                            <p className={'text-xs mt-1'}>
                                <span
                                    className={
                                        'text-sm mt-1 text-neutral-700 font-medium'
                                    }
                                >
                                    Date & Time:
                                </span>{' '}
                                {slotDateFormate(item.slotDate)} |{' '}
                                {item.slotTime}
                            </p>
                        </div>
                        <div></div>
                        <div className={'flex flex-col gap-2 justify-end'}>
                            {!item.cancel &&
                                item.payment &&
                                !item.isCompleted && (
                                    <button
                                        className={
                                            'sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50'
                                        }
                                    >
                                        Paid
                                    </button>
                                )}
                            {!item.cancel &&
                                !item.payment &&
                                !item.isCompleted && (
                                    <button
                                        className={
                                            'text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300'
                                        }
                                        onClick={() =>
                                            AppointmentStripe(item._id)
                                        }
                                    >
                                        Pay Online
                                    </button>
                                )}

                            {!item.cancel && !item.isCompleted && (
                                <button
                                    className={
                                        'text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300'
                                    }
                                    onClick={() => cancelAppointment(item._id)}
                                >
                                    Cancel Appointment
                                </button>
                            )}
                            {item.cancel && !item.isCompleted && (
                                <button
                                    className={
                                        'sm:nub-w-48 py-2 border border-red-500 py-2 rounded text-red-500'
                                    }
                                >
                                    Appointment cancelled
                                </button>
                            )}
                            {item.isCompleted && (
                                <button
                                    className={
                                        'sm:min-w-48 py-2 border border-green-500 rounded text-green-500'
                                    }
                                >
                                    Completed
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAppointments;
