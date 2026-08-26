import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

const Banner = () => {
    const navigate = useNavigate();
    const { token, userData } = useContext(AppContext);

    return (
        <div className="relative mx-4 sm:mx-[10%] my-20 overflow-hidden rounded-2xl bg-[#FF4B2E]">
            {/* Speed-line Signature, passend zum Header */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-6 top-0 h-full w-24 skew-x-[-12deg] bg-black/10" />
                <div className="absolute right-16 top-0 h-full w-4 skew-x-[-12deg] bg-black/10" />
            </div>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 px-6 sm:px-10 md:px-14 py-10 md:py-16">
                <div className="text-[#0C0E12]">
                    <p className="font-['Anton'] uppercase text-3xl md:text-5xl leading-tight">
                        Start Training
                    </p>
                    <p className="font-['Anton'] uppercase text-3xl md:text-5xl leading-tight">
                        With Trusted Trainers
                    </p>
                </div>
                {token && userData ? (
                    <button
                        onClick={() => {
                            navigate('/trainers');
                            window.scrollTo(0, 0);
                        }}
                        className="flex-shrink-0 rounded-full bg-[#0C0E12] px-8 py-3 text-sm font-semibold text-[#F5F3EE] hover:scale-105 transition-transform duration-300"
                    >
                        Book an Appointment
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            navigate('/login');
                            window.scrollTo(0, 0);
                        }}
                        className="flex-shrink-0 rounded-full bg-[#0C0E12] px-8 py-3 text-sm font-semibold text-[#F5F3EE] hover:scale-105 transition-transform duration-300"
                    >
                        Konto erstellen
                    </button>
                )}
            </div>
        </div>
    );
};

export default Banner;
