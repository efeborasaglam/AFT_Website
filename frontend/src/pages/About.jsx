import React from 'react';
import { assets } from '../assets/assets.js';

const About = () => {
    return (
        <div className={'bg-[#0C0E12] sm:mx-[11%]'}>
            <div className={'text-center text-2xl pt-10 text-[#F5F3EE]'}>
                <p>
                    ABOUT US{' '}
                    <span className={'text-[#FF4B2E] font-medium'}>US</span>
                </p>
            </div>

            <div className={'my-10 flex flex-col md:flex-row gap-12'}>
                <img
                    className={'w-full md:max-w-[460px]'}
                    src={assets.football_3}
                    alt={'img'}
                />
                <div
                    className={
                        'flex flex-col justify-center gap-6 md:w-2/4 text-sm text-[#9AA0A8]'
                    }
                >
                    <p>
                        I played for Grasshopper Club Zürich for seven years,
                        progressing through the youth ranks from the U15 to the
                        U21 level. My goal was professional football, but
                        looking back, I lacked—among other things—the
                        athleticism required to make that final step. That
                        experience shaped AFT Performance. Today, I use my
                        expertise as an Elite Athlete Performance Coach to help
                        young footballers and ambitious athletes become faster,
                        more explosive, and higher-performing.
                    </p>
                    <b className={'text-[#F5F3EE]'}>Our Vision</b>
                    <p>
                        Our vision is to provide targeted support to athletes,
                        helping them unlock their full physical potential and
                        achieve sustainable improvements in their athletic
                        performance. Through professional athletic training,
                        personalized guidance, and modern training concepts, we
                        aim to take athletes to the next level—from young
                        prospects to ambitious adults.
                    </p>
                </div>
            </div>
            <div className={'text-xl my-4 text-[#F5F3EE]'}>
                <p>
                    WHY{' '}
                    <span className={'text-[#FF4B2E] font-semibold'}>
                        CHOSE US
                    </span>
                </p>
            </div>
            <div className={'flex flex-col md:flex-row mb-20'}>
                <div
                    className={
                        'border border-[#2E333B] px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#FF4B2E] hover:text-[#0C0E12] transation-all duration-300 text-[#9AA0A8] cursor-pointer'
                    }
                >
                    <img
                        src={assets.football_4}
                        alt="Efficiency"
                        className="w-full h-40 object-cover rounded"
                    />
                    <b>EFFICIENCY:</b>
                    <p>
                        Effective athletic training with a clear goal: better
                        performance in less time. Each training session focuses
                        on the skills that are truly crucial for the individual
                        athlete.
                    </p>
                </div>
                <div
                    className={
                        'border border-[#2E333B] px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#FF4B2E] hover:text-[#0C0E12] transation-all duration-300 text-[#9AA0A8] cursor-pointer'
                    }
                >
                    <img
                        src={assets.football_5}
                        alt="Convenience"
                        className="w-full h-40 object-cover rounded"
                    />
                    <b>CONVIENCE:</b>
                    <p>
                        Training should be easy to integrate into everyday life.
                        Through online booking, flexible training options, and
                        future digital programs, we provide straightforward
                        access to professional athletic training.
                    </p>
                </div>
                <div
                    className={
                        'border border-[#2E333B] px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#FF4B2E] hover:text-[#0C0E12] transation-all duration-300 text-[#9AA0A8] cursor-pointer'
                    }
                >
                    <img
                        src={assets.football_6}
                        alt="Personalization"
                        className="w-full h-40 object-cover rounded"
                    />
                    <b>PERSONILATION</b>
                    <p>
                        Every athlete is different. That is why training content
                        and workloads are tailored to age, performance level,
                        goals, and individual needs—for targeted and sustainable
                        development.
                    </p>
                </div>
            </div>
        </div>
    );
};
export default About;
