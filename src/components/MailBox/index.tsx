'use client';

import React, {useState} from 'react';
import {Formik, FormikValues} from "formik";
import clsx from "clsx";
import styles from "./mail-box.module.scss";
import SpinnerIcon from "@src/assets/icons/spinner.svg";
import EmailIcon from "@src/assets/icons/email.svg";
import UserIcon from "@src/assets/icons/user.svg";
import NotebookIcon from "@src/assets/icons/notebook.svg";
import AttachmentIcon from "@src/assets/icons/attachment.svg";
import CheckmarkBoxIcon from "@src/assets/icons/checkmark-box.svg";
import CloseBtn from "@src/components/CloseBtn";

const MailBox: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const initialValues = {
        name: "",
        eMail: "",
        message: "",
        file: "",
    };

    const handleOpen = () => {
        setIsOpen(!isOpen)
    };

    const onSubmit = (values: FormikValues) => {
        setIsLoading(true);
        console.log('onSubmit Form', values);
    };

    return (
        <div className="mail-box">
            <button onClick={handleOpen} className="text-orange uppercase text-xs md:text-2xl">Get in touch</button>
            {
                isOpen && (
                    <div className="fixed top-0 left-0 z-20 min-w-full grid grid-cols-4 md:grid-cols-7">
                        <div className="flex items-center justify-center h-16 col-start-4 col-end-4 md:col-start-7 md:col-end-7">
                            <CloseBtn onClose={handleOpen} className="w-10 md:w-14" />
                        </div>
                    </div>
                )
            }
            <div className={clsx(
                "fixed top-0 left-0 w-full h-full z-10 bg-gradient-to-r from-gray-30 to-white overflow-y-auto",
                `${styles["mail-box"]}`,
                isOpen && `${styles["open"]}`
            )}>
                <div className="flex justify-center items-center h-full flex-col mx-10 md:mx-0 mt-20 mb-10 md:my-0">
                    <h3 className="text-center text-2xl md:text-4xl lg:text-6xl mb-12 uppercase">Let's discuss your thoughts</h3>
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        {({ values, isSubmitting, setFieldValue, handleChange, handleBlur, handleSubmit, isValid, errors, touched }) => (
                            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full sm:w-80 md:w-1/3 lg:w-1/4">
                                <label htmlFor="input-group-1"
                                       className="self-start block mb-2 text-sm font-medium text-black">Your Name</label>
                                <div className="relative mb-6 w-full">
                                    <div
                                        className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                        <UserIcon className="w-5 h-5 fill-gray-60" />
                                    </div>
                                    <input type="text" id="input-group-1"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        className="bg-white border border-2 border-gray-30 text-gray-90 text-sm rounded-full focus:ring-orange focus:border-orange block w-full pl-10 p-2.5"
                                        placeholder="Name"
                                    />
                                </div>

                                <label htmlFor="input-group-2"
                                       className="self-start block mb-2 text-sm font-medium text-black">Your Email</label>
                                <div className="relative mb-6 w-full">
                                    <div
                                        className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                        <EmailIcon className="w-5 h-5 fill-gray-60" />
                                    </div>
                                    <input type="text" id="input-group-2"
                                        name="eMail"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.eMail}
                                        className="bg-white border border-2 border-gray-30 text-gray-90 text-sm rounded-full focus:ring-orange focus:border-orange block w-full pl-10 p-2.5"
                                        placeholder="name@gmail.com"
                                    />
                                </div>

                                <label htmlFor="input-group-3"
                                       className="self-start block mb-2 text-sm font-medium text-black">Your Message</label>
                                <div className="relative mb-6 w-full">
                                    <div
                                        className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                        <NotebookIcon className="w-5 h-5 fill-gray-60" />
                                    </div>
                                    <input type="text" id="input-group-3"
                                        name="message"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.message}
                                        className="bg-white border border-2 border-gray-30 text-gray-90 text-sm rounded-full focus:ring-orange focus:border-orange block w-full pl-10 p-2.5"
                                        placeholder="Write to us"
                                    />
                                </div>

                                <label htmlFor="file"
                                       className="mb-8 flex flex-col items-center justify-center w-full h-28 border-2 border-gray-30 text-gray-90 rounded-[1.5rem] cursor-pointer bg-gray-10">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        {
                                            values.file ? (
                                                <>
                                                    <p className="mb-2 text-sm text-gray-50 dark:text-gray-40">Thanks, file was attached</p>
                                                    <CheckmarkBoxIcon className="w-8 h-8 fill-orange" />
                                                </>
                                            ) : (
                                                <>
                                                    <AttachmentIcon className="w-8 h-8 mb-4 text-gray-60" />
                                                    <p className="mb-2 text-sm text-gray-50 dark:text-gray-40"><span
                                                        className="font-semibold">Click to attached</span> or drag and drop file</p>
                                                    <p className="text-xs text-gray-50 dark:text-gray-40">PDF, DOC or XLS
                                                        (MAX. 500 kB)</p>
                                                </>
                                            )
                                        }
                                    </div>
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <input type="file" id="file"
                                        className="hidden"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.file}
                                    />
                                </div>

                                <button type="submit" disabled className="disabled:bg-gray-30 flex justify-center items-center gap-2 text-white text-xl px-6 py-3 rounded-full bg-yellow-50 hover:bg-orange">
                                    {isLoading ? (
                                        <>
                                            <SpinnerIcon className="w-6 h-6 animate-spin fill-orange" />
                                            Processing...
                                        </>
                                    ) : "Let's discuss"}
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default MailBox;
