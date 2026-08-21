import React from 'react';
import Header from '../components/Header.jsx';
import SpecialityMenu from '../components/SpecialityMenu.jsx';
import TopDoctors from '../components/TopDoctors.jsx';
import Banner from '../components/Banner.jsx';
import { assets } from '../assets/assets.js';

const Home = () => {
    return (
        <div>
            <Header />
            <div className={'mx-4 sm:mx-[10%]'}>
                <SpecialityMenu />
            </div>
            <div className={'mx-4 sm:mx-[10%]'}>
                <TopDoctors />
            </div>
            <div className={'mx-4 sm:mx-[10%]'}>
                <Banner />
            </div>
        </div>
    );
};
export default Home;
