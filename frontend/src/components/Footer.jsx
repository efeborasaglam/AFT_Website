import React from 'react';
import { assets } from '../assets/assets.js';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <div className={`bg-[#0C0E12] sm:mx-[11%]`}>
            <div
                className={
                    'flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm mx-4 sm:mx-0'
                }
            >
                {/*    left*/}
                <div>
                    <img
                        className={'mb-5 w-40'}
                        src={assets.logo}
                        alt={'logo'}
                    />
                    <p className={'w-full md:w-2/3 text-[#9AA0A8] leading-6'}>
                        {t('footer.descr')}
                        <br />
                        <span className={'text-[#FF4B2E]'}>
                            {t('footer.descr.orange')}
                        </span>
                    </p>
                </div>
                {/*    center*/}
                <div>
                    <p
                        className={
                            'text-xl font-medium mb-5 text-[#F5F3EE] uppercase tracking-wide'
                        }
                    >
                        Company
                    </p>
                    <ul className={'flex flex-col gap-2 text-[#9AA0A8]'}>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                {/*    right*/}
                <div>
                    <p
                        className={
                            'text-xl font-medium mb-5 text-[#F5F3EE] uppercase tracking-wide'
                        }
                    >
                        Get in Touch
                    </p>
                    <ul className={'flex flex-col gap-2 text-[#9AA0A8]'}>
                        <li>+654641231</li>
                        <li>fener@fener</li>
                        <li className={'ms-8'}>
                            <i className="bi bi-instagram text-xl text-[#F5F3EE]"></i>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                {/*  copy right  */}
                <hr className={'border-[#2E333B]'} />
                <p className={'py-5 text-sm text-center text-[#9AA0A8]'}>
                    Copyright 2026@ AFT Performance - All Right Reserved.
                </p>
            </div>
        </div>
    );
};
export default Footer;
