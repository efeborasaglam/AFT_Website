import React from 'react';
import { Link } from 'react-router-dom';

// Lokale Fachbereiche — ersetzt die bisherige assets.js-Abhängigkeit.
// Passe Namen/Icons gern an eure echten Disziplinen an.

const disciplines = [
    {
        speciality: 'Athletik-Einzeltrainings',
        label: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do',
    },
    {
        speciality: 'Athletik-Gruppentraining',
        label: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do',
    },
    {
        speciality: 'Online-Coaching',
        label: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do',
    },
    {
        speciality: 'Digitale-Programme',
        label: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do',
    },
];
const SpecialityMenu = () => {
    return (
        <div
            className="flex flex-col items-center gap-3 py-20 bg-[#0C0E12] text-[#F5F3EE]"
            id="specality"
        >
            <span className="font-mono text-xs tracking-[0.3em] text-[#C8FF3D] uppercase">
                Disziplinen
            </span>
            <h2 className="font-['Anton'] uppercase text-3xl md:text-4xl">
                Find by Speciality
            </h2>
            <p className="text-[#9AA0A8] text-sm text-center max-w-md">
                Wähle einen Bereich und finde direkt passende Trainer.
            </p>

            <div className="flex gap-3 pt-8 w-full overflow-x-auto px-4 sm:justify-center sm:px-0">
                {disciplines.map((item, index) => (
                    <Link
                        key={index}
                        to={`/trainers/${item.speciality}`}
                        onClick={() => window.scrollTo(0, 0)}
                        className="flex-shrink-0 flex items-center gap-2 rounded-full border border-[#2E333B] bg-[#16191F] px-5 py-3 text-xs uppercase tracking-wide text-[#F5F3EE] hover:border-[#FF4B2E] hover:text-[#FF4B2E] transition-colors duration-300"
                    >
                        {item.speciality}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SpecialityMenu;
