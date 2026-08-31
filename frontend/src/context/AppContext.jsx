import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const months = [
    ' ',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

const AppContextProvider = (props) => {
    const currencySymbol = 'CHF';
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(
        localStorage.getItem('token') ? localStorage.getItem('token') : false
    );
    const [userData, setUserData] = useState(false);

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list');
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (e) {
            console.log(e + 'AYRIII');
            toast.error(e.message);
        }
    };

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + '/api/user/get-profile',
                {
                    headers: { token },
                }
            );
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (e) {
            console.log(e + 'AYRIII');
            toast.error(e.message);
        }
    };

    // slotDate kommt jetzt immer als "YYYY-MM-DD" aus dem Availability-Block
    const slotDateFormate = (slotDate) => {
        if (!slotDate) return '';
        const [year, month, day] = slotDate.split('-');
        return `${Number(day)} ${months[Number(month)]} ${year}`;
    };

    const value = {
        doctors,
        getDoctorsData,
        currencySymbol,
        currency: currencySymbol, // Alias, weil manche Komponenten "currency" erwarten
        slotDateFormate,
        token,
        setToken,
        backendUrl,
        userData,
        setUserData,
        loadUserProfileData,
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false);
        }
    }, [token]);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
