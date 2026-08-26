import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { assets } from '../assets/assets.js';

const Doctors = () => {
    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(null);

    const specialities = [
        {
            title: 'Athletik-Einzeltrainings',
            description:
                'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do',
        },
        {
            title: 'Athletik-Gruppentraining',
            description:
                'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do',
        },
        {
            title: 'Online-Coaching',
            description:
                'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do',
        },
        {
            title: 'Digitale-Programme',
            description:
                'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do',
        },
    ];

    const toggle = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    const featuredTrainers = doctors?.slice(0, 2) || [];

    return (
        <div
            className={
                'relative bg-[#0C0E12] px-4 sm:px-[8%] py-16 overflow-hidden'
            }
        >
            {/* Speed-line Signature, same motif as Header */}
            <div className="pointer-events-none absolute inset-0 -z-0">
                <div className="absolute -left-10 top-0 h-full w-40 -skew-x-12 bg-[#FF4B2E]/10" />
                <div className="absolute left-24 top-0 h-full w-6 -skew-x-12 bg-[#FF4B2E]/10" />
            </div>

            {/* Top section */}
            <div
                className={
                    'relative flex flex-col md:flex-row gap-10 md:gap-20'
                }
            >
                {/* Left - About text */}
                <div className={'flex-1'}>
                    <span className="font-mono text-xs tracking-[0.3em] text-[#C8FF3D] uppercase">
                        Über Uns
                    </span>
                    <h1
                        className={
                            "font-['Anton'] uppercase text-4xl sm:text-5xl text-[#F5F3EE] leading-[0.95] mt-3"
                        }
                    >
                        Designed For
                        <br />
                        <span className="text-[#FF4B2E]">Performance</span>
                    </h1>
                    <div
                        className={
                            'w-32 h-1 bg-[#FF4B2E] rounded-full mt-4 mb-6'
                        }
                    />
                    <div
                        className={
                            'text-[#9AA0A8] leading-relaxed mb-4 space-y-3'
                        }
                    >
                        {featuredTrainers.map((trainer) => (
                            <p key={trainer._id}>{trainer.about}</p>
                        ))}
                    </div>
                </div>

                {/* Right - Specialities accordion */}
                <div className={'flex-1 flex flex-col'}>
                    {specialities.map((item, index) => (
                        <div
                            key={item.title}
                            className={'border-b border-[#2E333B] py-4'}
                        >
                            <button
                                onClick={() => toggle(index)}
                                className={
                                    'w-full flex items-center justify-between text-left'
                                }
                            >
                                <span
                                    className={
                                        "uppercase italic font-['Anton'] text-[#F5F3EE] text-lg"
                                    }
                                >
                                    {item.title}
                                </span>
                                <span
                                    className={
                                        'text-2xl text-[#FF4B2E] font-light'
                                    }
                                >
                                    {openIndex === index ? '−' : '+'}
                                </span>
                            </button>
                            <div
                                className={`grid transition-all duration-300 ease-in-out ${
                                    openIndex === index
                                        ? 'grid-rows-[1fr] opacity-100 mt-3'
                                        : 'grid-rows-[0fr] opacity-0'
                                } overflow-hidden`}
                            >
                                <p
                                    className={
                                        'text-[#9AA0A8] text-sm overflow-hidden'
                                    }
                                >
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom - Featured trainers */}
            <div
                className={
                    'relative grid grid-cols-1 sm:grid-cols-2 gap-8 mt-20'
                }
            >
                {featuredTrainers.map((trainer) => (
                    <div key={trainer._id} className={'flex flex-col'}>
                        <div
                            className={
                                'relative rounded-xl overflow-hidden bg-[#16191F]'
                            }
                            style={{
                                clipPath:
                                    'polygon(8% 0, 100% 0, 100% 100%, 0 100%)',
                            }}
                        >
                            <img
                                src={trainer.image}
                                alt={trainer.name}
                                className={'w-full h-[420px] object-cover'}
                            />
                        </div>
                        <div className={'mt-4 text-center'}>
                            <p
                                className={
                                    "text-xl font-['Anton'] text-[#F5F3EE] uppercase"
                                }
                            >
                                {trainer.name}
                            </p>
                            <p className={'text-[#9AA0A8] text-sm mb-4'}>
                                {trainer.speciality?.join(', ')}
                            </p>
                            <button
                                onClick={() =>
                                    navigate(`/appointment/${trainer._id}`)
                                }
                                className={
                                    'bg-[#FF4B2E] text-[#0C0E12] px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300'
                                }
                            >
                                Termin buchen
                            </button>
                        </div>
                    </div>
                ))}
                <img src={assets.football_2} className={'rounded-xl'} />
            </div>
        </div>
    );
};

export default Doctors;
