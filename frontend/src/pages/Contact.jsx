import React, { useRef, useState } from 'react';
import { assets } from '../assets/assets.js';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const form = useRef();
    const { t } = useTranslation();

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
        <div className={'bg-[#0C0E12]'}>
            <div className="text-center text-2xl pt-10 text-[#F5F3EE]">
                <p>
                    {t('contact.title')}
                    <span className="text-[#FF4B2E] font-semibold">
                        {t('contact.title.us2')}
                    </span>
                </p>
            </div>

            <div className="my-10 flex flex-col justify-center lg:flex-row gap-10 mb-28 text-sm px-4 lg:px-0">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3202.6153086425857!2d8.535128976691235!3d47.41389900126402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a8e61abf2af%3A0xea0e210680aa374!2sBirchstrasse%20183B%2C%208050%20Z%C3%BCrich!5e1!3m2!1sde!2sch!4v1789922577179!5m2!1sde!2sch"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Standort AFT Performance"
                ></iframe>
                <div className="flex flex-col justify-center items-start gap-6 lg:max-w-[320px]">
                    <p className="font-semibold text-lg text-[#F5F3EE]">
                        {t('contact.location.title')}
                    </p>
                    <p className="text-[#9AA0A8]">
                        8050 Zürich <br />
                        Birchstrasse 183b
                    </p>
                    <p className="text-[#9AA0A8]">
                        Tel: 076 586 41 70 <br />
                        Email: aftperformance@gmail.com
                    </p>
                    {/*<p className="font-semibold text-lg text-[#F5F3EE]">*/}
                    {/*    CAREERS AT AFT Performance*/}
                    {/*</p>*/}
                    {/*<p className="text-[#9AA0A8]">*/}
                    {/*    Learn about our teams and job openings*/}
                    {/*</p>*/}
                    {/*<button className="border border-[#2E333B] text-[#F5F3EE] px-8 py-4 text-sm hover:bg-[#FF4B2E] hover:text-[#0C0E12] hover:border-[#FF4B2E] transition-all duration-500">*/}
                    {/*    Explore Jobs*/}
                    {/*</button>*/}
                </div>
            </div>
            <div className={'flex justify-center items-center'}>
                <form
                    ref={form}
                    onSubmit={sendEmail}
                    className="flex flex-col gap-4 w-full lg:max-w-[900px] border border-[#2E333B] rounded-lg p-8"
                >
                    <p className="font-semibold text-lg text-[#F5F3EE] mb-2">
                        {t('contact.send')}{' '}
                    </p>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="from_name"
                            className="text-[#9AA0A8] text-xs font-medium"
                        >
                            {t('contact.name')}
                        </label>
                        <input
                            type="text"
                            name="from_name"
                            id="from_name"
                            required
                            className="border border-[#2E333B] bg-[#16191F] text-[#F5F3EE] rounded px-4 py-2 outline-none focus:border-[#FF4B2E] transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="to_name"
                            className="text-[#9AA0A8] text-xs font-medium"
                        >
                            {t('contact.to')}
                        </label>
                        <input
                            type="text"
                            name="to_name"
                            id="to_name"
                            required
                            className="border border-[#2E333B] bg-[#16191F] text-[#F5F3EE] rounded px-4 py-2 outline-none focus:border-[#FF4B2E] transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="reply_to"
                            className="text-[#9AA0A8] text-xs font-medium"
                        >
                            {t('contact.email')}
                        </label>
                        <input
                            type="email"
                            name="reply_to"
                            id="reply_to"
                            required
                            className="border border-[#2E333B] bg-[#16191F] text-[#F5F3EE] rounded px-4 py-2 outline-none focus:border-[#FF4B2E] transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="message"
                            className="text-[#9AA0A8] text-xs font-medium"
                        >
                            {t('contact.message')}{' '}
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            rows={4}
                            required
                            className="border border-[#2E333B] bg-[#16191F] text-[#F5F3EE] rounded px-4 py-2 outline-none focus:border-[#FF4B2E] transition-all resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={sending}
                        className="border border-[#2E333B] text-[#F5F3EE] px-8 py-4 text-sm mt-2 hover:bg-[#FF4B2E] hover:text-[#0C0E12] hover:border-[#FF4B2E] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {sending ? 'Sending...' : t('contact.button')}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
