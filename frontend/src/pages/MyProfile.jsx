import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import { assets } from '../assets/assets.js';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
    const { userData, setUserData, token, backendUrl, loadUserProfileData } =
        useContext(AppContext);

    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('address', JSON.stringify(userData.address));
            formData.append('gender', userData.gender);
            formData.append('dob', userData.dob);

            image && formData.append('image', image);

            const { data } = await axios.post(
                backendUrl + '/api/user/update-profile',
                formData,
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(false);
            } else {
                toast.error(data.message);
            }
        } catch (e) {
            console.log(e);
            toast.error(e.message);
        }
    };

    return (
        userData && (
            <div
                className={
                    'max-w-lg flex flex-col gap-2 text-sm sm:mx-[11%] text-[#D6D3CE]'
                }
            >
                {isEdit ? (
                    <label htmlFor={'image'}>
                        <div className={'inline-block relative cursor-pointer'}>
                            <img
                                className={'w-36 rounded opacity-75'}
                                src={
                                    image
                                        ? URL.createObjectURL(image)
                                        : userData.image
                                }
                            />
                            <img
                                className={'w-10 absolute bottom-12 right-12'}
                                src={image ? '' : assets.upload_icon}
                            />
                        </div>
                        <input
                            onChange={(e) => setImage(e.target.files[0])}
                            type={'file'}
                            id={'image'}
                            hidden
                        />
                    </label>
                ) : (
                    <img
                        src={userData.image}
                        alt="profile"
                        className={'w-32 h-32 rounded'}
                    />
                )}

                {isEdit ? (
                    <input
                        className={
                            'bg-[#16191F] text-[#F5F3EE] text-3xl font-medium max-w-60 mt-4'
                        }
                        type={'text'}
                        value={userData.name}
                        onChange={(e) =>
                            setUserData((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                    />
                ) : (
                    <p className={'font-medium text-3xl text-[#F5F3EE] mt-4'}>
                        {userData.name}
                    </p>
                )}

                <hr className={'bg-[#2E333B] h-[1px] border-none'} />

                <div>
                    <p className={'text-[#9AA0A8] underline mt-3'}>
                        CONTACT INFORMATION
                    </p>

                    <div
                        className={
                            'grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#D6D3CE]'
                        }
                    >
                        <p className={'font-medium'}>Email id: </p>
                        <p className={'text-[#FF4B2E]'}>{userData.email}</p>

                        <p className={'font-medium'}>Phone: </p>

                        {isEdit ? (
                            <input
                                type={'text'}
                                className={
                                    'bg-[#16191F] text-[#F5F3EE] max-w-52'
                                }
                                value={userData.phone}
                                onChange={(e) =>
                                    setUserData((prev) => ({
                                        ...prev,
                                        phone: e.target.value,
                                    }))
                                }
                            />
                        ) : (
                            <p className={'text-[#FF4B2E]'}>{userData.phone}</p>
                        )}

                        <p className={'font-medium'}>Address: </p>

                        <p>
                            {isEdit ? (
                                <div>
                                    <input
                                        onChange={(e) =>
                                            setUserData((prev) => ({
                                                ...prev,
                                                address: {
                                                    ...prev.address,
                                                    line1: e.target.value,
                                                },
                                            }))
                                        }
                                        className={
                                            'bg-[#16191F] text-[#F5F3EE]'
                                        }
                                        value={userData.address?.line1 || ''}
                                        type={'text'}
                                    />

                                    <br />

                                    <input
                                        onChange={(e) =>
                                            setUserData((prev) => ({
                                                ...prev,
                                                address: {
                                                    ...prev.address,
                                                    line2: e.target.value,
                                                },
                                            }))
                                        }
                                        className={
                                            'bg-[#16191F] text-[#F5F3EE]'
                                        }
                                        value={userData.address?.line2 || ''}
                                        type={'text'}
                                    />
                                </div>
                            ) : (
                                <p className={'text-[#9AA0A8]'}>
                                    {userData.address?.line1}
                                    <br />
                                    {userData.address?.line2}
                                </p>
                            )}
                        </p>
                    </div>
                </div>

                <div>
                    <p className={'text-[#9AA0A8] underline mt-3'}>
                        BASIC INFORMATION
                    </p>

                    <div
                        className={
                            'grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#D6D3CE]'
                        }
                    >
                        <p className={'font-medium'}>Gender: </p>

                        {isEdit ? (
                            <select
                                className={
                                    'max-w-20 bg-[#16191F] text-[#F5F3EE]'
                                }
                                onChange={(e) =>
                                    setUserData((prev) => ({
                                        ...prev,
                                        gender: e.target.value,
                                    }))
                                }
                                value={userData.gender}
                            >
                                <option value={'Male'}>Male</option>
                                <option value={'Female'}>Female</option>
                            </select>
                        ) : (
                            <p className={'text-[#9AA0A8]'}>
                                {userData.gender}
                            </p>
                        )}

                        <p className={'font-medium'}>Birthday: </p>

                        {isEdit ? (
                            <input
                                type={'date'}
                                className={
                                    'max-w-28 bg-[#16191F] text-[#F5F3EE]'
                                }
                                value={userData.dob}
                                onChange={(e) =>
                                    setUserData((prev) => ({
                                        ...prev,
                                        dob: e.target.value,
                                    }))
                                }
                            />
                        ) : (
                            <p className={'text-[#9AA0A8]'}>{userData.dob}</p>
                        )}
                    </div>
                </div>

                <div className={'mt-10'}>
                    {isEdit ? (
                        <button
                            onClick={updateUserProfileData}
                            className={
                                'border border-[#FF4B2E] px-8 py-2 rounded-full hover:bg-[#FF4B2E] hover:text-[#0C0E12] transition-all duration-500'
                            }
                        >
                            Save Information
                        </button>
                    ) : (
                        <button
                            className={
                                'border border-[#FF4B2E] px-8 py-2 rounded-full hover:text-[#0C0E12] hover:bg-[#FF4B2E] transition-all duration-500'
                            }
                            onClick={() => setIsEdit(true)}
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        )
    );
};

export default MyProfile;
