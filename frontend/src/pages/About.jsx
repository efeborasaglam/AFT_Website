import React from 'react';
import { assets } from '../assets/assets.js';
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();

    return (
        <div className={'bg-[#0C0E12] sm:mx-[11%]'}>
            <div className={'text-center text-2xl pt-10 text-[#F5F3EE]'}>
                <p>
                    ABOUT{' '}
                    <span className={'text-[#FF4B2E] font-medium'}>
                        {t('navbar.about2')}
                    </span>
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
                    <p>{t('trainer.descr')}</p>
                    <b className={'text-[#F5F3EE]'}>
                        {t('about.vision.title')}
                    </b>
                    <p>{t('about.vision.descr')}</p>
                </div>
            </div>
            <div className={'text-xl my-4 text-[#F5F3EE]'}>
                <p>
                    {t('about.why')}
                    <span className={'text-[#FF4B2E] font-semibold'}>
                        {t('about.choseus')}
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
                    <b>{t('about.efficiency')}:</b>
                    <p>{t('about.efficiency.descr')}</p>
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
                    <b>{t('about.convie')}:</b>
                    <p>{t('about.convience.descr')}</p>
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
                    <b>{t('about.personilation')}</b>
                    <p>{t('about.personilation.descr')}</p>
                </div>
            </div>
        </div>
    );
};
export default About;
