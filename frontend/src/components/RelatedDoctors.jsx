import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ docId, speciality }) => {
    const { doctors } = useContext(AppContext);
    const navigate = useNavigate();

    const [relDoc, setRelDoc] = useState([]);

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter(
                (doc) =>
                    doc.speciality.some((s) => speciality.includes(s)) &&
                    doc._id !== docId
            );
            setRelDoc(doctorsData);
        }
    }, [doctors, speciality, docId]);

    return (
        <div>
            {' '}
            <div
                className={
                    'flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'
                }
            >
                <h1 className={'text-3xl font-medium'}>Top Trainers to Book</h1>
                <p className={'sm:w-1/3 text-center text-sm'}>
                    Simply browse through our extensive list of trusted
                    trainers.
                </p>
                <div
                    className={
                        'w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'
                    }
                >
                    {relDoc.slice(0, 5).map((item, index) => (
                        <div
                            className={
                                'border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transation-all duration-500'
                            }
                            key={index}
                            onClick={() => {
                                navigate(`/appointment/${item._id}`);
                                scrollTo(0, 0);
                            }}
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
                <button
                    onClick={() => {
                        navigate('/trainers');
                        scrollTo(0, 0);
                    }}
                    className={
                        'bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'
                    }
                >
                    more
                </button>
            </div>
        </div>
    );
};
export default RelatedDoctors;
