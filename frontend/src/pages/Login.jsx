import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { backendUrl, token, setToken } = useContext(AppContext);
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
                    {state === 'Sign Up' ? 'Create Account' : 'Login'}
                </p>
                <p>
                    Please {state === 'sign up' ? 'Create Account' : 'login'} to
                    book appointment
                </p>
                {state === 'Sign Up' && (
                    <div className={'w-full'}>
                        <p>Full Name</p>
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
                    <p>Email</p>
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
                    <p>Password</p>
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
                    {state === 'Sign Up' ? 'Create Account' : 'Login'}
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
                            Login here
                        </span>
                    </p>
                ) : (
                    <p>
                        Create an new account?{' '}
                        <span
                            className={
                                'text-[#FF4B2E] underline cursor-pointer'
                            }
                            onClick={() => setState('Sign Up')}
                        >
                            Click here
                        </span>
                    </p>
                )}
            </div>
        </form>
    );
};
export default Login;
