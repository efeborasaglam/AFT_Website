import React from 'react';
import { assets } from '../assets/assets.js';

const About = () => {
    return (
        <div className={'bg-[#0C0E12] sm:mx-[11%]'}>
            <div className={'text-center text-2xl pt-10 text-[#F5F3EE]'}>
                <p>
                    ABOUT{' '}
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
                        Ich habe sieben Jahre beim Grasshopper Club Zürich
                        gespielt und dabei die Nachwuchsabteilungen von der U15
                        bis zur U21 durchlaufen. Mein Ziel war der Profifussball
                        – doch rückblickend fehlte mir unter anderem die
                        notwendige Athletik für den letzten Schritt. Diese
                        Erfahrung hat AFT Performance geprägt. Heute nutze ich
                        mein Wissen als Elite Athlete Performance Coach, um
                        junge Fussballer und ambitionierte Athleten schneller,
                        explosiver und leistungsfähiger zu machen.
                    </p>
                    <b className={'text-[#F5F3EE]'}>Our Vision</b>
                    <p>
                        Unsere Vision ist es, Athleten gezielt dabei zu
                        unterstützen, ihr körperliches Potenzial auszuschöpfen
                        und ihre sportliche Leistung nachhaltig zu verbessern.
                        Mit professionellem Athletiktraining, individueller
                        Betreuung und modernen Trainingskonzepten möchten wir
                        Athleten auf das nächste Level bringen – vom
                        Nachwuchsspieler bis zum ambitionierten Erwachsenen.
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
                        Effektives Athletiktraining mit einem klaren Ziel:
                        bessere Leistung in kürzerer Zeit. Jede Trainingseinheit
                        konzentriert sich auf die Fähigkeiten, die für den
                        jeweiligen Athleten wirklich entscheidend sind.
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
                        Training soll sich einfach in den Alltag integrieren
                        lassen. Mit Online-Buchung, flexiblen Trainingsangeboten
                        und zukünftig digitalen Programmen ermöglichen wir einen
                        unkomplizierten Zugang zu professionellem
                        Athletiktraining.
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
                        Jeder Athlet ist unterschiedlich. Deshalb werden
                        Trainingsinhalte und Belastungen an Alter,
                        Leistungsstand, Ziele und individuelle Bedürfnisse
                        angepasst – für eine gezielte und nachhaltige
                        Entwicklung.
                    </p>
                </div>
            </div>
        </div>
    );
};
export default About;
