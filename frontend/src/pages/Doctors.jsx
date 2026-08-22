// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { AppContext } from '../context/AppContext.jsx';
//
// const Doctors = () => {
//     const { speciality } = useParams();
//
//     const { doctors } = useContext(AppContext);
//     const [filterDoc, setFilterDoc] = useState([]);
//     const [showFilter, setShowFilter] = useState(false);
//
//     const navigate = useNavigate();
//
//     const applyFilter = () => {
//         if (speciality) {
//             setFilterDoc(
//                 doctors.filter((doc) => doc.speciality.includes(speciality))
//             );
//         } else {
//             setFilterDoc(doctors);
//         }
//     };
//
//     useEffect(() => {
//         applyFilter();
//     }, [doctors, speciality]);
//
//     console.log(speciality);
//
//     return (
//         <div>
//             <p className={'text-gray-600'}>
//                 Browse through the doctors specialist.
//             </p>
//
//             <div className={'flex flex-col sm:flex-row items-start gap-5 mt-5'}>
//                 <button
//                     className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ' '}`}
//                     onClick={() => setShowFilter((prev) => !prev)}
//                 >
//                     Filters
//                 </button>
//                 <div
//                     className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}
//                 >
//                     <p
//                         onClick={() =>
//                             speciality === 'Athletik-Einzeltrainings'
//                                 ? navigate('/doctors')
//                                 : navigate('/doctors/Athletik-Einzeltrainings')
//                         }
//                         className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Athletik-Einzeltrainings' ? 'bg-indigo-100 text-black' : ''}`}
//                     >
//                         Athletik-Einzeltrainings
//                     </p>
//                     <p
//                         onClick={() =>
//                             speciality === 'Athletik-Gruppentraining'
//                                 ? navigate('/doctors')
//                                 : navigate('/doctors/Athletik-Gruppentraining')
//                         }
//                         className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Athletik-Gruppentraining' ? 'bg-indigo-100 text-black' : ''}`}
//                     >
//                         Athletik-Gruppentraining
//                     </p>
//                     <p
//                         onClick={() =>
//                             speciality === 'Online-Coaching'
//                                 ? navigate('/doctors')
//                                 : navigate('/doctors/Online-Coaching')
//                         }
//                         className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Online-Coaching' ? 'bg-indigo-100 text-black' : ''}`}
//                     >
//                         Online-Coaching
//                     </p>
//                     <p
//                         onClick={() =>
//                             speciality === 'Digitale-Programme'
//                                 ? navigate('/doctors')
//                                 : navigate('/doctors/Digitale-Programme')
//                         }
//                         className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Digitale-Programme' ? 'bg-indigo-100 text-black' : ''}`}
//                     >
//                         Digitale-Programme
//                     </p>
//                 </div>
//                 <div className={'w-full grid grid-cols-auto gap-4 gap-y-6'}>
//                     {filterDoc.map((item, index) => (
//                         <div
//                             className={
//                                 'border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transation-all duration-500'
//                             }
//                             key={index}
//                             onClick={() => navigate(`/appointment/${item._id}`)}
//                         >
//                             <img
//                                 className={'bg-glue-50'}
//                                 src={item.image}
//                                 alt={item.name}
//                             />
//                             <div className={'p-4'}>
//                                 <div
//                                     className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}
//                                 >
//                                     <p
//                                         className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}
//                                     ></p>
//                                     <p>
//                                         {item.available
//                                             ? 'Available'
//                                             : 'Not Available'}
//                                     </p>
//                                 </div>
//                                 <p
//                                     className={
//                                         'text-gray-900 text-lg font-medium'
//                                     }
//                                 >
//                                     {item.name}
//                                 </p>
//                                 <p className={'text-gray-600 text-sm'}>
//                                     {item.speciality.join(', ')}
//                                 </p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default Doctors;

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { assets } from '../assets/assets.js';

const Doctors = () => {
    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(null);

    const specialities = [
        {
            title: 'Athletik-Einzeltrainings',
            description:
                'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do',
        },
        {
            title: 'Athletik-Gruppentraining',
            description:
                'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do',
        },
        {
            title: 'Online-Coaching',
            description:
                'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do',
        },
        {
            title: 'Digitale-Programme',
            description:
                'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do',
        },
    ];

    const toggle = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    const featuredTrainers = doctors?.slice(0, 2) || [];

    return (
        <div className={'px-4 sm:px-[8%] py-16'}>
            {/* Top section */}
            <div className={'flex flex-col md:flex-row gap-10 md:gap-20'}>
                {/* Left - About text */}
                <div className={'flex-1'}>
                    <h1
                        className={
                            'text-4xl sm:text-5xl font-extrabold uppercase italic text-primary leading-tight'
                        }
                    >
                        Designed For
                        <br />
                        Performance
                    </h1>
                    <div
                        className={
                            'w-32 h-1 bg-blue-400 rounded-full mt-2 mb-6'
                        }
                    />
                    <p className={'text-gray-600 leading-relaxed mb-4'}>
                        {featuredTrainers.map((trainer) => (
                            <p>{trainer.about}</p>
                        ))}
                    </p>
                </div>

                {/* Right - Specialities accordion */}
                <div className={'flex-1 flex flex-col'}>
                    {specialities.map((item, index) => (
                        <div
                            key={item.title}
                            className={'border-b border-gray-300 py-4'}
                        >
                            <button
                                onClick={() => toggle(index)}
                                className={
                                    'w-full flex items-center justify-between text-left'
                                }
                            >
                                <span
                                    className={
                                        'uppercase italic font-bold text-primary text-lg'
                                    }
                                >
                                    {item.title}
                                </span>
                                <span
                                    className={
                                        'text-2xl text-primary font-light'
                                    }
                                >
                                    {openIndex === index ? '−' : '+'}
                                </span>
                            </button>
                            <div
                                className={`grid transition-all duration-300 ease-in-out ${
                                    openIndex === index
                                        ? 'grid-rows-[1fr] opacity-100 mt-3'
                                        : 'grid-rows-[0fr] opacity-0'
                                } overflow-hidden`}
                            >
                                <p
                                    className={
                                        'text-gray-500 text-sm overflow-hidden'
                                    }
                                >
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom - Featured trainers */}
            <div className={'grid grid-cols-1 sm:grid-cols-2 gap-8 mt-20'}>
                {featuredTrainers.map((trainer) => (
                    <div key={trainer._id} className={'flex flex-col'}>
                        <div
                            className={
                                'rounded-xl overflow-hidden bg-indigo-50'
                            }
                        >
                            <img
                                src={trainer.image}
                                alt={trainer.name}
                                className={'w-full h-[420px] object-cover'}
                            />
                        </div>
                        <div className={'mt-4 text-center'}>
                            <p
                                className={
                                    'text-xl font-bold text-primary uppercase'
                                }
                            >
                                {trainer.name}
                            </p>
                            <p className={'text-gray-500 text-sm mb-4'}>
                                {trainer.speciality?.join(', ')}
                            </p>
                            <button
                                onClick={() =>
                                    navigate(`/appointment/${trainer._id}`)
                                }
                                className={
                                    'bg-primary text-white px-8 py-3 rounded-full font-light hover:opacity-90 transition-all'
                                }
                            >
                                Book an appointment
                            </button>
                        </div>
                    </div>
                ))}
                <img src={assets.Placeholder} />
            </div>
        </div>
    );
};

export default Doctors;
