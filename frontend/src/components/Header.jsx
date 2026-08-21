import React from 'react';
import { useTranslation } from 'react-i18next';
import { assets } from '../assets/assets.js';

const Header = () => {
    return (
        <div className={' relative py-10'}>
            <div
                className={
                    'absolute inset-0 top-[-20px] bg-size-[100%_auto] bg-center bg-no-repeat -z-10'
                }
                style={{
                    backgroundImage: `url(${assets.background_image})`,
                }}
            />
            <div
                className={
                    'absolute bottom-0 left-0 right-0 h-32 md:h-48 ' +
                    'bg-gradient-to-b from-transparent to-white -z-[5] pointer-events-none'
                }
            />
            <div
                className={
                    'relative overflow-hidden flex flex-col sm:flex-row flex-wrap ' +
                    'bg-primary rounded-lg ' +
                    'sm:bg-white/5 sm:backdrop-blur-md sm:rounded-2xl ' +
                    'px-6 sm:px-10 lg:px-20 md:mx-[11%]'
                }
            >
                {/* LEft side */}
                <div
                    className={
                        'md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] md:mb-[-30px]'
                    }
                >
                    <p
                        className={
                            'text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'
                        }
                    >
                        AFT Performance (Athletic Football Training)
                        <br />
                        With Trusted Trainers
                    </p>
                    <div
                        className={
                            'flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'
                        }
                    >
                        <img
                            className={'w-28'}
                            src={assets.group_profiles}
                            alt={'group'}
                        />
                        <p>
                            Simply browse through our extensive list of trusted
                            Trainers,
                            <br className={'hidden sm:block'} /> schedule your
                            appointment hassle-free.
                        </p>
                    </div>
                    <a
                        className={
                            'flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'
                        }
                        href={'#specality'}
                    >
                        Book appointment{' '}
                        <img
                            src={assets.arrow_icon}
                            className={'w-3'}
                            alt={'arrow'}
                        />
                    </a>
                </div>

                {/* Right side */}
                <div className={'md:w-1/2 relative'}>
                    <img
                        className={
                            'md:absolute h-auto rounded-lg object-scale-down object-center'
                        }
                        src={assets.Placeholder}
                        alt={'header'}
                    />
                </div>
            </div>{' '}
        </div>
    );
};

export default Header;
