import React from 'react';
import { assets } from '../assets/assets.js';
import emailjs from '@emailjs/browser';

const About = () => {
    return (
        <div>
            <div className={'text-center text-2xl pt-10 text-gray-5'}>
                <p>
                    ABOUT{' '}
                    <span className={'text-gray-700 font-medium'}>US</span>
                </p>
            </div>

            <div className={'my-10 flex flex-col md:flex-row gap-12'}>
                <img
                    className={'w-full md:max-w-[460px]'}
                    src={assets.about_image}
                    alt={'img'}
                />
                <div
                    className={
                        'flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'
                    }
                >
                    <p>
                        Ich habe sieben Jahre beim Grasshopper Club Zürich
                        gespielt und die Nachwuchsabteilungen von der U15 bis
                        zur U21 durchlaufen. Mein Ziel war es, Profifussballer
                        zu werden. Rückblickend bin ich überzeugt, dass ich den
                        letzten Schritt in den Profifussball unter anderem
                        aufgrund fehlender Athletik nicht geschafft habe. Diese
                        Erfahrung ist die Motivation hinter AFT Performance.
                        Heute möchte ich vor allem junge Fussballathleten, aber
                        auch ambitionierte Erwachsene und langfristig Leistungs-
                        und Profifussballer schneller, explosiver und
                        leistungsfähiger machen. Ich bin Elite Athlete
                        Performance Coach.
                    </p>
                    <b className={'text-gray-800'}>Our Vision</b>
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet
                        clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat,
                        sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea
                        takimata sanctus est Lorem ipsum dolor sit amet.
                    </p>
                </div>
            </div>
            <div className={'text-xl my-4'}>
                <p>
                    WHY{' '}
                    <span className={'text-gray-700 font-semibold'}>
                        CHOSE US
                    </span>
                </p>
            </div>
            <div className={'flex flex-col md:flex-row mb-20'}>
                <div
                    className={
                        'border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transation-all duration-300 text-gray-600 cursor-pointer'
                    }
                >
                    <img
                        src={assets.Placeholder}
                        alt="Efficiency"
                        className="w-full h-40 object-cover rounded"
                    />
                    <b>EFFICIENCY:</b>
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet
                        clita kasd gubergren,
                    </p>
                </div>
                <div
                    className={
                        'border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transation-all duration-300 text-gray-600 cursor-pointer'
                    }
                >
                    <img
                        src={assets.Placeholder}
                        alt="Convenience"
                        className="w-full h-40 object-cover rounded"
                    />
                    <b>CONVIENCE:</b>
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet
                        clita kasd gubergren,
                    </p>
                </div>
                <div
                    className={
                        'border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transation-all duration-300 text-gray-600 cursor-pointer'
                    }
                >
                    <img
                        src={assets.Placeholder}
                        alt="Personalization"
                        className="w-full h-40 object-cover rounded"
                    />
                    <b>PERSONILATION</b>
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet
                        clita kasd gubergren,
                    </p>
                </div>
            </div>
        </div>
    );
};
export default About;
