import React, { useRef, useState } from 'react';
import { assets } from '../assets/assets.js';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    const [sending, setSending] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setSending(true);

        emailjs
            .sendForm(
                'service_y8uyw5d',
                'template_xf89axp',
                form.current,
                'z5YI5Eg5V03BQFY-p'
            )
            .then(
                (result) => {
                    console.log(result.text);
                    alert('E-Mail erfolgreich gesendet!');
                    form.current.reset();
                },
                (error) => {
                    console.log(error.text);
                    alert('Fehler beim Senden.');
                }
            )
            .finally(() => setSending(false));
    };

    return (
        <div>
            <div className="text-center text-2xl pt-10 text-gray-500">
                <p>
                    CONTACT{' '}
                    <span className="text-gray-700 font-semibold">US</span>
                </p>
            </div>

            <div className="my-10 flex flex-col justify-center lg:flex-row gap-10 mb-28 text-sm px-4 lg:px-0">
                <img
                    className="w-full lg:max-w-[400px] rounded object-cover"
                    src={assets.contact_image}
                    alt="Contact"
                />

                <div className="flex flex-col justify-center items-start gap-6 lg:max-w-[320px]">
                    <p className="font-semibold text-lg text-gray-600">
                        OUR OFFICE
                    </p>
                    <p className="text-gray-600">
                        9014 St. Gallen <br />
                        Lehnstrasse 73
                    </p>
                    <p className="text-gray-600">
                        Tel: 078 730 46 45 <br />
                        Email: efebora.saglam@hotmail.com
                    </p>
                    <p className="font-semibold text-lg text-gray-600">
                        CAREERS AT AFT Performance
                    </p>
                    <p className="text-gray-500">
                        Learn about our teams and job openings
                    </p>
                    <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
                        Explore Jobs
                    </button>
                </div>
            </div>
            <div className={'flex justify-center items-center'}>
                <form
                    ref={form}
                    onSubmit={sendEmail}
                    className="flex flex-col gap-4 w-full lg:max-w-[900px] border border-gray-200 rounded-lg p-8"
                >
                    <p className="font-semibold text-lg text-gray-600 mb-2">
                        SEND US A MESSAGE
                    </p>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="from_name"
                            className="text-gray-600 text-xs font-medium"
                        >
                            Your Name
                        </label>
                        <input
                            type="text"
                            name="from_name"
                            id="from_name"
                            required
                            className="border border-gray-300 rounded px-4 py-2 outline-none focus:border-primary transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="to_name"
                            className="text-gray-600 text-xs font-medium"
                        >
                            To
                        </label>
                        <input
                            type="text"
                            name="to_name"
                            id="to_name"
                            required
                            className="border border-gray-300 rounded px-4 py-2 outline-none focus:border-primary transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="reply_to"
                            className="text-gray-600 text-xs font-medium"
                        >
                            Your Email
                        </label>
                        <input
                            type="email"
                            name="reply_to"
                            id="reply_to"
                            required
                            className="border border-gray-300 rounded px-4 py-2 outline-none focus:border-primary transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="message"
                            className="text-gray-600 text-xs font-medium"
                        >
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            rows={4}
                            required
                            className="border border-gray-300 rounded px-4 py-2 outline-none focus:border-primary transition-all resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={sending}
                        className="border border-black px-8 py-4 text-sm mt-2 hover:bg-black hover:text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {sending ? 'Sending...' : 'Send Email'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
