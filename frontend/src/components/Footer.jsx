import React from 'react';
import { assets } from '../assets/assets.js';
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    return (
        <div className={`${isHome ? 'sm:mx-[11%]' : ''}`}>
            <div
                className={
                    'flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'
                }
            >
                {/*    left*/}
                <div>
                    <img
                        className={'mb-5 w-40'}
                        src={assets.logo}
                        alt={'logo'}
                    />
                    <p className={'w-full md:w-2/3 text-gray-600 leading-6'}>
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
                {/*    center*/}
                <div>
                    <p className={'text-xl font-medium mb-5'}>COMPANY</p>
                    <ul className={'flex flex-col gap-2 text-gray-600'}>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                {/*    right*/}
                <div>
                    <p className={'text-xl font-medium mb-5'}>Get in Touch</p>
                    <ul className={'flex flex-col gap-2 text-gray-600'}>
                        <li>+654641231</li>
                        <li>fener@fener</li>
                        <li className={'ms-8'}>
                            <i className="bi bi-instagram text-xl"></i>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                {/*  copy right  */}
                <hr />
                <p className={'py-5 text-sm text-center text-gray-500'}>
                    Copyright 2024@ AFT Performance - All Right Reserved.
                </p>
            </div>
        </div>
    );
};
export default Footer;
