import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="relative bg-[#0C0E12] overflow-hidden">
            {/* Speed-line Signature: diagonale Streifen im Hintergrund, jetzt sichtbarer & über die volle Höhe */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-16 top-0 h-[140%] w-48 -skew-x-12 bg-[#FF4B2E]/[0.08]" />
                <div className="absolute left-32 top-0 h-[140%] w-8 -skew-x-12 bg-[#FF4B2E]/[0.08]" />
            </div>

            <div className="relative mx-4 sm:mx-[6%] lg:mx-[10%] grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-10 py-16 md:py-24">
                {/* Left side */}
                <div className="flex flex-col items-start gap-6 order-2 md:order-1">
                    <span className="font-mono text-xs tracking-[0.3em] text-[#C8FF3D] uppercase">
                        {t('home.main.descr')}
                    </span>

                    <h1 className="font-['Anton'] uppercase text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-[#F5F3EE]">
                        {t('home.main.goals')}
                        <br />
                        <span className="text-[#FF4B2E]">Peak</span> Potential
                    </h1>

                    <p className="text-[#9AA0A8] text-sm md:text-base leading-relaxed max-w-md">
                        {t('home.main.undergoal')}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        <button
                            onClick={() => {
                                document
                                    .getElementById('specality')
                                    ?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-[#FF4B2E] text-[#0C0E12] font-semibold text-sm px-8 py-3 rounded-full hover:scale-105 transition-transform duration-300"
                        >
                            {t('home.main.button')}
                        </button>
                        <button
                            onClick={() => navigate('/trainers')}
                            className="border border-[#2E333B] text-[#F5F3EE] text-sm px-8 py-3 rounded-full hover:border-[#FF4B2E] transition-colors duration-300"
                        >
                            {t('home.main.button2')}
                        </button>
                    </div>
                </div>

                {/* Right side — Bild mit diagonalem Schnitt, jetzt sauber im Rahmen */}
                <div className="relative order-1 md:order-2 max-w-md md:max-w-none mx-auto md:mx-0 w-full">
                    <div
                        className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl"
                        style={{
                            clipPath:
                                'polygon(8% 0, 100% 0, 100% 100%, 0 100%)',
                        }}
                    >
                        <img
                            className="w-full h-full object-cover"
                            src={assets.trainer_pic}
                            alt="AFT Performance Trainer im Training"
                        />
                        {/* dezenter Verlauf unten, damit der Badge nicht auf nacktem Bildrand sitzt */}
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0C0E12]/70 to-transparent" />
                    </div>

                    <div className="absolute left-4 bottom-4 bg-[#C8FF3D] text-[#0C0E12] rounded-xl px-5 py-3 font-mono text-xs uppercase tracking-wide shadow-lg">
                        {t('home.main.button3')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
