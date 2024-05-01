'use client';

import React, { useState } from 'react';
import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';

import UserIcon from '@src/assets/icons/user.svg';
import EmailIcon from '@src/assets/icons/email.svg';
import NotebookIcon from '@src/assets/icons/notebook.svg';
import CheckmarkBoxIcon from '@src/assets/icons/checkmark-box.svg';
import AttachmentIcon from '@src/assets/icons/attachment.svg';
import SpinnerIcon from '@src/assets/icons/spinner.svg';

const MessageSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  message: Yup.string()
    .min(2, 'Too Short!')
    .max(256, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  file: Yup.object().shape({
    files: Yup.mixed().required(),
  }),
});

const GetInTouchForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (values: FormikValues) => {
    setIsLoading(true);
    console.log('onSubmit Form', values);
  };

  return (
    <>
      <h3 className="text-center text-xl md:text-2xl mb-12 uppercase">
        Let's discuss your thoughts
      </h3>
      <Formik
        initialValues={{
          name: '',
          email: '',
          message: '',
          file: '',
        }}
        validationSchema={MessageSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          isSubmitting,
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          errors,
          touched,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center w-full sm:w-80"
          >
            <div className="flex w-full gap-1 justify-between">
              <label
                htmlFor="input-group-1"
                className="self-start block mb-2 text-sm font-medium text-black"
              >
                Your Name
              </label>
              {errors.name && touched.name ? (
                <div className="text-red-70 subtitle text-sm">
                  {errors.name}
                </div>
              ) : null}
            </div>
            <div className="relative mb-6 w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <UserIcon className="w-5 h-5 fill-gray-60" />
              </div>
              <input
                type="text"
                id="input-group-1"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className="bg-white border border-2 border-gray-30 text-gray-90 text-sm rounded-full focus:ring-orange focus:border-orange block w-full pl-10 p-2.5"
                placeholder="Name"
              />
            </div>

            <label
              htmlFor="input-group-2"
              className="self-start block mb-2 text-sm font-medium text-black"
            >
              Your email
            </label>
            <div className="relative mb-6 w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <EmailIcon className="w-5 h-5 fill-gray-60" />
              </div>
              <input
                type="text"
                id="input-group-2"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="bg-white border border-2 border-gray-30 text-gray-90 text-sm rounded-full focus:ring-orange focus:border-orange block w-full pl-10 p-2.5"
                placeholder="Email"
              />
            </div>

            <label
              htmlFor="input-group-3"
              className="self-start block mb-2 text-sm font-medium text-black"
            >
              Your Message
            </label>
            <div className="relative mb-6 w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <NotebookIcon className="w-5 h-5 fill-gray-60" />
              </div>
              <input
                type="text"
                id="input-group-3"
                name="message"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
                className="bg-white border border-2 border-gray-30 text-gray-90 text-sm rounded-full focus:ring-orange focus:border-orange block w-full pl-10 p-2.5"
                placeholder="Write to us"
              />
            </div>

            <label
              htmlFor="file"
              className="mt-4 mb-10 flex flex-col items-center justify-center w-full h-28 border-2 border-gray-30 text-gray-90 rounded-[1.5rem] cursor-pointer bg-gray-10"
            >
              <div className="flex flex-col items-center justify-center">
                {values.file ? (
                  <>
                    <p className="mb-2 text-sm text-gray-50 dark:text-gray-40">
                      Thanks, file was attached
                    </p>
                    <CheckmarkBoxIcon className="w-8 h-8 fill-orange" />
                  </>
                ) : (
                  <>
                    <AttachmentIcon className="w-8 h-8 mb-4 text-gray-60" />
                    <p className="mb-2 text-sm text-gray-50 dark:text-gray-40">
                      <span className="font-semibold">Click to attached</span>{' '}
                      or drag and drop file
                    </p>
                    <p className="text-xs text-gray-50 dark:text-gray-40">
                      PDF, DOC or XLS (MAX. 500 kB)
                    </p>
                  </>
                )}
              </div>
            </label>
            <div className="flex items-center justify-center w-full">
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.file}
              />
            </div>

            <button
              type="submit"
              className="disabled:bg-gray-30 flex justify-center items-center gap-2 text-white text-xl px-6 py-3 rounded-full bg-black hover:bg-orange"
            >
              {isLoading ? (
                <>
                  <SpinnerIcon className="w-6 h-6 animate-spin fill-orange" />
                  Processing...
                </>
              ) : (
                "Let's discuss"
              )}
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default GetInTouchForm;
