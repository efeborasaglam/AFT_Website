import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

const Doctors = () => {
    const { speciality } = useParams();

    const { doctors } = useContext(AppContext);
    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

    const navigate = useNavigate();

    const applyFilter = () => {
        if (speciality) {
            setFilterDoc(
                doctors.filter((doc) => doc.speciality.includes(speciality))
            );
        } else {
            setFilterDoc(doctors);
        }
    };

    useEffect(() => {
        applyFilter();
    }, [doctors, speciality]);

    console.log(speciality);

    return (
        <div>
            <p className={'text-gray-600'}>
                Browse through the doctors specialist.
            </p>

            <div className={'flex flex-col sm:flex-row items-start gap-5 mt-5'}>
                <button
                    className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ' '}`}
                    onClick={() => setShowFilter((prev) => !prev)}
                >
                    Filters
                </button>
                <div
                    className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}
                >
                    <p
                        onClick={() =>
                            speciality === 'Athletik-Einzeltrainings'
                                ? navigate('/doctors')
                                : navigate('/doctors/Athletik-Einzeltrainings')
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Athletik-Einzeltrainings' ? 'bg-indigo-100 text-black' : ''}`}
                    >
                        Athletik-Einzeltrainings
                    </p>
                    <p
                        onClick={() =>
                            speciality === 'Athletik-Gruppentraining'
                                ? navigate('/doctors')
                                : navigate('/doctors/Athletik-Gruppentraining')
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Athletik-Gruppentraining' ? 'bg-indigo-100 text-black' : ''}`}
                    >
                        Athletik-Gruppentraining
                    </p>
                    <p
                        onClick={() =>
                            speciality === 'Online-Coaching'
                                ? navigate('/doctors')
                                : navigate('/doctors/Online-Coaching')
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Online-Coaching' ? 'bg-indigo-100 text-black' : ''}`}
                    >
                        Online-Coaching
                    </p>
                    <p
                        onClick={() =>
                            speciality === 'Digitale-Programme'
                                ? navigate('/doctors')
                                : navigate('/doctors/Digitale-Programme')
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Digitale-Programme' ? 'bg-indigo-100 text-black' : ''}`}
                    >
                        Digitale-Programme
                    </p>
                </div>
                <div className={'w-full grid grid-cols-auto gap-4 gap-y-6'}>
                    {filterDoc.map((item, index) => (
                        <div
                            className={
                                'border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transation-all duration-500'
                            }
                            key={index}
                            onClick={() => navigate(`/appointment/${item._id}`)}
                        >
                            <img
                                className={'bg-glue-50'}
                                src={item.image}
                                alt={item.name}
                            />
                            <div className={'p-4'}>
                                <div
                                    className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}
                                >
                                    <p
                                        className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}
                                    ></p>
                                    <p>
                                        {item.available
                                            ? 'Available'
                                            : 'Not Available'}
                                    </p>
                                </div>
                                <p
                                    className={
                                        'text-gray-900 text-lg font-medium'
                                    }
                                >
                                    {item.name}
                                </p>
                                <p className={'text-gray-600 text-sm'}>
                                    {item.speciality.join(', ')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Doctors;
