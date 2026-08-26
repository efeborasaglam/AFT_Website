import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import MyAppointments from './pages/MyAppointments.jsx';
import Doctors from './pages/Doctors.jsx';
import MyProfile from './pages/MyProfile.jsx';
import Appointment from './pages/Appointment.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import { ToastContainer } from 'react-toastify';
import Verify from './pages/Verify.jsx';

const App = () => {
    return (
        <div>
            <ToastContainer />
            <NavBar />
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/about'} element={<About />} />
                <Route path={'/contact'} element={<Contact />} />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/my-appointments'} element={<MyAppointments />} />
                <Route path={'/trainers'} element={<Doctors />} />
                <Route path={'/trainers/:speciality'} element={<Doctors />} />
                <Route path={'/my-profile'} element={<MyProfile />} />
                <Route path={'/appointment/:docId'} element={<Appointment />} />
                <Route path={'/verify'} element={<Verify />} />
            </Routes>
            <Footer />
        </div>
    );
};
export default App;
