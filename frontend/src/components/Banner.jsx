import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { assets } from '../assets/assets.js';

const Banner = () => {
    const navigate = useNavigate();
    const { token, userData } = useContext(AppContext);

    const [currentImage, setCurrentImage] = useState(0);

    const footballImages = [
        assets.football_1,
        assets.football_2,
        assets.football_3,
        assets.football_4,
        assets.football_5,
        assets.football_6,
        assets.football_7,
        assets.football_8,
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % footballImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative mx-4 sm:mx-[10%] my-20 overflow-hidden rounded-2xl bg-[#FF4B2E]">
            {/* Speed-line Signature, passend zum Header */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-6 top-0 h-full w-24 skew-x-[-12deg] bg-black/10" />
                <div className="absolute right-16 top-0 h-full w-4 skew-x-[-12deg] bg-black/10" />
            </div>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 px-6 sm:px-10 md:px-14 py-10 md:py-16">
                {/* Text */}
                <div className="text-[#0C0E12] z-10">
                    <p className="font-['Anton'] uppercase text-3xl md:text-5xl leading-tight">
                        Start Training
                    </p>

                    <p className="font-['Anton'] uppercase text-3xl md:text-5xl leading-tight">
                        With Trusted Trainers
                    </p>

                    <button
                        onClick={() => {
                            navigate('/about');
                            window.scrollTo(0, 0);
                        }}
                        className="mt-6 flex-shrink-0 rounded-full bg-[#0C0E12] px-8 py-3 text-sm font-semibold text-[#F5F3EE] hover:scale-105 transition-transform duration-300"
                    >
                        About Us
                    </button>
                </div>

                {/* Football Slideshow */}
                <div className="relative w-full md:w-[45%] h-52 sm:h-64 md:h-72 overflow-hidden rounded-2xl">
                    {footballImages.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Football ${index + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                                index === currentImage
                                    ? 'opacity-100 scale-100'
                                    : 'opacity-0 scale-105'
                            }`}
                        />
                    ))}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {footballImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImage(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    index === currentImage
                                        ? 'w-6 bg-[#F5F3EE]'
                                        : 'w-2 bg-[#F5F3EE]/50'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
