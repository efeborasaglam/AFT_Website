import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js';

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className="relative bg-[#0C0E12] overflow-hidden">
            {/* Speed-line Signature: diagonale Streifen im Hintergrund */}
            <div className="pointer-events-none absolute inset-0 -z-0">
                <div className="absolute -left-10 top-0 h-full w-40 -skew-x-12 bg-[#FF4B2E]/10" />
                <div className="absolute left-24 top-0 h-full w-6 -skew-x-12 bg-[#FF4B2E]/10" />
            </div>

            <div className="relative mx-4 sm:mx-[10%] flex flex-col md:flex-row items-center gap-10 py-16 md:py-24">
                {/* Left side */}
                <div className="md:w-1/2 flex flex-col items-start gap-6">
                    <span className="font-mono text-xs tracking-[0.3em] text-[#C8FF3D] uppercase">
                        Speed · Strength · Football
                    </span>
                    <h1 className="font-['Anton'] uppercase text-4xl md:text-6xl leading-[0.95] text-[#F5F3EE]">
                        Achieve Your
                        <br />
                        <span className="text-[#FF4B2E]">Peak</span> Potential
                    </h1>
                    <p className="text-[#9AA0A8] text-sm md:text-base max-w-md">
                        AFT Performance (Athletic Football Training) bringt dich
                        mit geprüften Trainern zusammen — buche deinen Termin in
                        wenigen Klicks.
                    </p>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                document
                                    .getElementById('specality')
                                    ?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-[#FF4B2E] text-[#0C0E12] font-semibold text-sm px-8 py-3 rounded-full hover:scale-105 transition-transform duration-300"
                        >
                            Termin buchen
                        </button>
                        <button
                            onClick={() => navigate('/trainers')}
                            className="border border-[#2E333B] text-[#F5F3EE] text-sm px-8 py-3 rounded-full hover:border-[#FF4B2E] transition-colors duration-300"
                        >
                            Trainer ansehen
                        </button>
                    </div>
                </div>

                {/* Right side — Platzhalterbild mit diagonalem Schnitt */}
                <div className="md:w-1/2 relative">
                    <div
                        className="relative w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl"
                        style={{
                            clipPath:
                                'polygon(8% 0, 100% 0, 100% 100%, 0 100%)',
                        }}
                    >
                        <img
                            className="w-full h-full"
                            src={assets.logo}
                            alt="AFT Performance Trainer im Training"
                        />
                    </div>
                    <div className="absolute -bottom-4 -left-4 bg-[#C8FF3D] text-[#0C0E12] rounded-xl px-5 py-3 font-mono text-xs uppercase tracking-wide shadow-lg">
                        200+ Athleten gecoacht
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
