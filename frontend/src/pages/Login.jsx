import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { backendUrl, token, setToken } = useContext(AppContext);
    const { t } = useTranslation();

    const navigate = useNavigate();

    const [state, setState] = useState('Sign Up');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (state === 'Sign Up') {
                const { data } = await axios.post(
                    backendUrl + '/api/user/register',
                    { name, password, email }
                );
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(
                    backendUrl + '/api/user/login',
                    { name, password, email }
                );
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                } else {
                    toast.error(data.message);
                }
            }
        } catch (e) {
            toast.error(e.message);
        }
    };

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        console.log(state);
    }, [state]);

    return (
        <form
            onSubmit={onSubmitHandler}
            className={'min-h-[80vh] flex items-center bg-[#0C0E12]'}
        >
            <div
                className={
                    'flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-[#2E333B] rounded-xl bg-[#16191F] text-[#9AA0A8] text-sm shadow-lg'
                }
            >
                <p className={'text-2xl font-semibold text-[#F5F3EE]'}>
                    {state === 'Sign Up' ? t('nav.create') : 'Login'}
                </p>
                <p>
                    {t('login.please')}{' '}
                    {state === 'Sign Up' ? t('login.createaccount') : 'Login'}{' '}
                    to
                    {t('login.bookappointment')}
                </p>
                {state === 'Sign Up' && (
                    <div className={'w-full'}>
                        <p>{t('login.name')}</p>
                        <input
                            type={'text'}
                            className={
                                'border border-[#2E333B] bg-[#0C0E12] text-[#F5F3EE] rounded w-full p-2 mt-1 outline-none focus:border-[#FF4B2E] transition-all'
                            }
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required={true}
                        />
                    </div>
                )}

                <div className={'w-full'}>
                    <p>{t('login.email')}</p>
                    <input
                        type={'email'}
                        onChange={(e) => setEmail(e.target.value)}
                        className={
                            'border border-[#2E333B] bg-[#0C0E12] text-[#F5F3EE] rounded w-full p-2 mt-1 outline-none focus:border-[#FF4B2E] transition-all'
                        }
                        value={email}
                        required={true}
                    />
                </div>
                <div className={'w-full'}>
                    <p>{t('login.password')}</p>
                    <input
                        type={'password'}
                        onChange={(e) => setPassword(e.target.value)}
                        className={
                            'border border-[#2E333B] bg-[#0C0E12] text-[#F5F3EE] rounded w-full p-2 mt-1 outline-none focus:border-[#FF4B2E] transition-all'
                        }
                        value={password}
                        required={true}
                    />
                </div>
                <button
                    type={'submit'}
                    className={
                        'bg-[#FF4B2E] text-[#0C0E12] w-full py-2 rounded-md text-base font-semibold hover:scale-[1.02] transition-transform duration-300'
                    }
                >
                    {state === 'Sign Up' ? t('nav.create') : t('login.login')}
                </button>
                {state === 'Sign Up' ? (
                    <p className={''}>
                        Already have an account?{' '}
                        <span
                            className={
                                'text-[#FF4B2E] underline cursor-pointer'
                            }
                            onClick={() => setState('Login')}
                        >
                            {t('login.login.here')}
                        </span>
                    </p>
                ) : (
                    <p>
                        {t('login.create')}{' '}
                        <span
                            className={
                                'text-[#FF4B2E] underline cursor-pointer'
                            }
                            onClick={() => setState('Sign Up')}
                        >
                            {t('login.create.here')}
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
};
export default Login;
