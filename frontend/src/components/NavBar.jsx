import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets.js';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

const navLinkClass = ({ isActive }) =>
    `py-1 uppercase text-xs tracking-wide transition-colors duration-300 ${
        isActive ? 'text-[#FF4B2E]' : 'text-[#F5F3EE] hover:text-[#FF4B2E]'
    }`;

const mobileLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded inline-block uppercase text-sm tracking-wide ${
        isActive ? 'text-[#FF4B2E]' : 'text-[#F5F3EE]'
    }`;

const NavBar = () => {
    const navigate = useNavigate();

    const { token, setToken, userData } = useContext(AppContext);

    const [showMenu, setShowMenu] = useState(false);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
    };

    return (
        <div
            className={`flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#2E333B] bg-[#0C0E12] mx-4 sm:mx-[11%]`}
        >
            <img
                onClick={() => {
                    navigate('/');
                }}
                className={'w-44 cursor-pointer'}
                src={assets.logo}
                alt={'logo'}
            />

            <ul className={'hidden md:flex items-center gap-6 font-medium'}>
                <NavLink to={'/'} className={navLinkClass}>
                    <li>HOME</li>
                </NavLink>
                <NavLink to={'/trainers'} className={navLinkClass}>
                    <li>ALL Trainers</li>
                </NavLink>
                <NavLink to={'/about'} className={navLinkClass}>
                    <li>ABOUT</li>
                </NavLink>
                <NavLink to={'/contact'} className={navLinkClass}>
                    <li>CONTACT</li>
                </NavLink>
            </ul>
            <div className={'flex items-center gap-4'}>
                {token && userData ? (
                    <div
                        className={
                            'flex items-center gap-2 cursor-pointer group relative'
                        }
                    >
                        <img
                            src={userData.image}
                            alt={'user'}
                            className={
                                'w-8 h-8 rounded-full object-cover cursor-pointer border border-[#2E333B]'
                            }
                        />
                        <img
                            src={assets.dropdown_icon}
                            alt={'arrow'}
                            className={'w-2.5 hidden md:flex invert'}
                        />
                        <div
                            className={
                                'absolute top-0 right-0 pt-14 text-base font-medium z-20 hidden group-hover:block'
                            }
                        >
                            <div
                                className={
                                    'min-w-48 bg-[#16191F] border border-[#2E333B] rounded-lg flex flex-col gap-4 p-4'
                                }
                            >
                                <NavLink to={'/my-profile'}>
                                    <p
                                        className={
                                            'text-[#F5F3EE] hover:text-[#FF4B2E] cursor-pointer text-sm uppercase tracking-wide'
                                        }
                                    >
                                        MY PROFILE
                                    </p>
                                </NavLink>
                                <NavLink to={'/my-appointments'}>
                                    <p
                                        className={
                                            'text-[#F5F3EE] hover:text-[#FF4B2E] cursor-pointer text-sm uppercase tracking-wide'
                                        }
                                    >
                                        MY APPOINTMENTS
                                    </p>
                                </NavLink>
                                <NavLink to={'/'} onClick={logout}>
                                    <p
                                        className={
                                            'text-[#F5F3EE] hover:text-[#FF4B2E] cursor-pointer text-sm uppercase tracking-wide'
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
                            'bg-[#FF4B2E] text-[#0C0E12] px-8 py-3 rounded-full font-semibold text-sm hidden md:block hover:scale-105 transition-transform duration-300'
                        }
                    >
                        Create account
                    </button>
                )}
                <img
                    onClick={() => setShowMenu(true)}
                    className={'w-6 md:hidden invert'}
                    alt={'menu'}
                    src={assets.menu_icon}
                />
                {/*    Mobile Menu  */}
                <div
                    className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-[#0C0E12] transition-all`}
                >
                    <div
                        className={
                            'flex items-center justify-between px-5 py-6 border-b border-[#2E333B]'
                        }
                    >
                        <img
                            className={'w-36'}
                            src={assets.logo}
                            alt={'logo'}
                        />
                        <img
                            className={'w-7 invert'}
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
                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to={'/'}
                            className={mobileLinkClass}
                        >
                            HOME
                        </NavLink>
                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to={'/trainers'}
                            className={mobileLinkClass}
                        >
                            ALL Trainers
                        </NavLink>
                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to={'/about'}
                            className={mobileLinkClass}
                        >
                            ABOUT
                        </NavLink>
                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to={'/contact'}
                            className={mobileLinkClass}
                        >
                            CONTACT
                        </NavLink>
                        {token && userData ? (
                            <>
                                <NavLink
                                    to={'/my-profile'}
                                    onClick={() => setShowMenu(false)}
                                >
                                    <p
                                        className={
                                            'text-[#F5F3EE] hover:text-[#FF4B2E] cursor-pointer'
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
                                            'text-[#F5F3EE] hover:text-[#FF4B2E] cursor-pointer'
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
                                            'text-[#0C0E12] cursor-pointer mt-10 bg-[#FF4B2E] px-6 py-3 rounded-full font-semibold'
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
                                        'bg-[#FF4B2E] text-[#0C0E12] px-8 py-3 mt-10 rounded-full font-semibold'
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
