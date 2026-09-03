import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { useTranslation } from 'react-i18next';

const PLACEHOLDER = 'https://placehold.co/400x500/16191F/9AA0A8?text=Trainer';

const TopDoctors = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { doctors } = useContext(AppContext);

    return (
        <div className="flex flex-col items-center gap-3 py-20 bg-[#0C0E12] text-[#F5F3EE]">
            <span className="font-mono text-xs tracking-[0.3em] text-[#C8FF3D] uppercase">
                {t('home.trainer.hi')}
            </span>
            <h2 className="font-['Anton'] uppercase text-3xl md:text-4xl">
                {t('home.trainer.book')}
            </h2>
            <p className="text-[#9AA0A8] text-sm text-center max-w-md">
                {t('home.trainer.certified')}
            </p>

            <div className="w-full flex flex-wrap justify-center gap-5 pt-10 px-4 sm:px-0">
                {doctors.slice(0, 10).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            navigate(`/appointment/${item._id}`);
                            window.scrollTo(0, 0);
                        }}
                        className="group w-full sm:w-64 cursor-pointer overflow-hidden rounded-xl border border-[#2E333B] bg-[#16191F] transition-all duration-300 hover:-translate-y-2 hover:border-[#FF4B2E]"
                    >
                        <div className="relative overflow-hidden">
                            <img
                                className="w-full h-56 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                src={item.image || PLACEHOLDER}
                                alt={item.name}
                            />
                            <div className="absolute top-3 left-3 h-2 w-8 skew-x-[-20deg] bg-[#FF4B2E]" />
                        </div>
                        <div className="p-4">
                            <div
                                className={`flex items-center gap-2 text-xs uppercase tracking-wide ${
                                    item.available
                                        ? 'text-[#C8FF3D]'
                                        : 'text-[#9AA0A8]'
                                }`}
                            >
                                <span
                                    className={`h-2 w-2 rounded-full ${
                                        item.available
                                            ? 'bg-[#C8FF3D]'
                                            : 'bg-[#9AA0A8]'
                                    }`}
                                />
                                {item.available ? 'Available' : 'Not Available'}
                            </div>
                            <p className="mt-2 text-lg font-medium text-[#F5F3EE]">
                                {item.name}
                            </p>
                            <p className="text-sm text-[#9AA0A8]">
                                {item.speciality
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
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => {
                    navigate('/trainers');
                    window.scrollTo(0, 0);
                }}
                className="mt-12 rounded-full border border-[#2E333B] px-12 py-3 text-sm uppercase tracking-wide text-[#F5F3EE] hover:border-[#FF4B2E] hover:text-[#FF4B2E] transition-colors duration-300"
            >
                {t('home.trainer.more')}
            </button>
        </div>
    );
};

export default TopDoctors;
