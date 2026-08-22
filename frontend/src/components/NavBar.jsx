import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets.js';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

const NavBar = () => {
    const navigate = useNavigate();

    const { token, setToken, userData } = useContext(AppContext);

    const [showMenu, setShowMenu] = useState(false);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
    };

    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div
            className={`flex item-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 mx-4 ${
                isHome ? 'sm:mx-[11%]' : ''
            }`}
        >
            <img
                onClick={() => {
                    navigate('/');
                }}
                className={'w-44 cursor-pointer'}
                src={assets.logo}
                alt={'logo'}
            />

            <ul className={'hidden md:flex items-start gap-5 font-medium'}>
                <NavLink to={'/'}>
                    <li className={'py-1'}>HOME</li>
                    <hr
                        className={
                            'border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'
                        }
                    />
                </NavLink>
                <NavLink to={'/doctors'}>
                    <li className={'py-1'}>ALL Trainers</li>
                    <hr
                        className={
                            'border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'
                        }
                    />
                </NavLink>
                <NavLink to={'/about'}>
                    <li className={'py-1'}>ABOUT</li>
                    <hr
                        className={
                            'border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'
                        }
                    />
                </NavLink>
                <NavLink to={'/contact'}>
                    <li className={'py-1'}>CONTACT</li>
                    <hr
                        className={
                            'border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'
                        }
                    />
                </NavLink>
            </ul>
            <div className={'flex item-center gap-4'}>
                {token && userData ? (
                    <div
                        className={
                            'flex items-center gap-2 cursor-pointer group relative'
                        }
                    >
                        <img
                            src={userData.image}
                            alt={'user'}
                            className={'w-8 cursor-pointer'}
                        />
                        <img
                            src={assets.dropdown_icon}
                            alt={'arrow'}
                            className={'w-2.5 hidden md:flex'}
                        />
                        <div
                            className={
                                'absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'
                            }
                        >
                            <div
                                className={
                                    'min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'
                                }
                            >
                                <NavLink to={'/my-profile'}>
                                    <p
                                        className={
                                            'hover:text-black cursor-pointer'
                                        }
                                    >
                                        MY PROFILE
                                    </p>
                                </NavLink>
                                <NavLink to={'/my-appointments'}>
                                    <p
                                        className={
                                            'hover:text-black cursor-pointer'
                                        }
                                    >
                                        MY APPOINTMENTS
                                    </p>
                                </NavLink>
                                <NavLink to={'/'} onClick={logout}>
                                    <p
                                        className={
                                            'hover:text-black cursor-pointer'
                                        }
                                    >
                                        LOGOUT
                                    </p>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className={
                            'bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
                        }
                    >
                        Create account
                    </button>
                )}
                <img
                    onClick={() => setShowMenu(true)}
                    className={'w-6 md:hidden'}
                    alt={'menu'}
                    src={assets.menu_icon}
                />
                {/*    Mobile Menu  */}
                <div
                    className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
                >
                    <div
                        className={
                            'flex items-center justify-between px-5 py-6'
                        }
                    >
                        <img
                            className={'w-36'}
                            src={assets.logo}
                            alt={'logo'}
                        />
                        <img
                            className={'w-7'}
                            onClick={() => setShowMenu(false)}
                            src={assets.cross_icon}
                            alt={'logo'}
                        />
                    </div>
                    <ul
                        className={
                            'flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'
                        }
                    >
                        <NavLink onClick={() => setShowMenu(false)} to={'/'}>
                            <p className={'px-4 py-2 rounded inline-block'}>
                                HOME
                            </p>
                        </NavLink>
                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to={'/doctors'}
                        >
                            <p className={'px-4 py-2 rounded inline-block'}>
                                {' '}
                                ALL Trainers
                            </p>
                        </NavLink>
                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to={'/about'}
                        >
                            <p className={'px-4 py-2 rounded inline-block'}>
                                ABOUT
                            </p>
                        </NavLink>
                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to={'/contact'}
                        >
                            <p className={'px-4 py-2 rounded inline-block'}>
                                CONTACT
                            </p>
                        </NavLink>
                        {token && userData ? (
                            <>
                                <NavLink
                                    to={'/my-profile'}
                                    onClick={() => setShowMenu(false)}
                                >
                                    <p
                                        className={
                                            'hover:text-black cursor-pointer'
                                        }
                                    >
                                        MY PROFILE
                                    </p>
                                </NavLink>
                                <NavLink
                                    to={'/my-appointments'}
                                    onClick={() => setShowMenu(false)}
                                >
                                    <p
                                        className={
                                            'hover:text-black cursor-pointer'
                                        }
                                    >
                                        MY APPOINTMENTS
                                    </p>
                                </NavLink>
                                <NavLink
                                    to={'/'}
                                    onClick={() => {
                                        setShowMenu(false);
                                        logout();
                                    }}
                                    id={'logout'}
                                >
                                    <p
                                        className={
                                            'hover:text-white text-white cursor-pointer mt-15 bg-red-500 p-3'
                                        }
                                    >
                                        LOGOUT
                                    </p>
                                </NavLink>
                            </>
                        ) : (
                            <NavLink
                                to={'/login'}
                                onClick={() => {
                                    setShowMenu(false);
                                }}
                            >
                                <p
                                    className={
                                        'bg-primary text-white px-8 py-3 mt-15 rounded-full font-light'
                                    }
                                >
                                    Create account
                                </p>
                            </NavLink>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default NavBar;
