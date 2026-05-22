'use client';

import React, { useState } from 'react';
import { Formik, FormikValues } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';

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
  message: Yup.string().min(2, 'Too Short!').max(256, 'Too Long!').required(),
  email: Yup.string().email('Invalid email').required('Required'),
  file: Yup.array().of(Yup.mixed().required('File is required')),
});

type FormFieldProps = {
  title: string;
  error?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

const FormField = ({ title, error, icon, children }: FormFieldProps) => {
  return (
    <>
      <div className="flex w-full gap-1 justify-between">
        <label
          htmlFor="input-group-1"
          className="self-start block mb-2 text-sm font-medium text-black"
        >
          {title}
        </label>
        {error ? (
          <div className="text-red-70 subtitle text-sm">{error}</div>
        ) : null}
      </div>
      <div className="relative mb-6 w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
          {icon}
        </div>
        {children}
      </div>
    </>
  );
};

type FormUploadFieldProps = {
  setFieldValue: (field: string, value: unknown) => void;
  values: FormikValues;
};

const FormUploadField = ({ setFieldValue, values }: FormUploadFieldProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': [],
      'text/xml': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        [],
    },
    onDrop: (acceptedFiles) => {
      setFieldValue('file', acceptedFiles);
    },
  });

  return (
    <div
      {...getRootProps({
        className: 'dropzone flex items-center justify-center w-full',
      })}
    >
      <label
        htmlFor="file"
        className={clsx(
          'mt-4 mb-10 flex flex-col items-center justify-center w-full h-28 border-2 border-gray-30 text-gray-90 rounded-[1.5rem] cursor-pointer bg-gray-10',
          isDragActive && 'border-orange',
        )}
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
                <span className="font-semibold">Click to attached</span> or drag
                and drop file
              </p>
              <p className="text-xs text-gray-50 dark:text-gray-40">
                PDF, DOC or XLS (MAX. 500 kB)
              </p>
            </>
          )}
        </div>
      </label>
      <input type="file" id="file" {...getInputProps()} />
    </div>
  );
};

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
          file: null,
        }}
        validationSchema={MessageSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
        }) => (
          <form
            onSubmit={handleSubmit}
            className={clsx(
              'flex flex-col justify-center items-center w-full sm:w-80',
              isLoading && 'pointer-events-none opacity-70',
            )}
          >
            <FormField
              title="Your Name"
              error={errors.name && touched.name ? errors.name : ''}
              icon={<UserIcon className="w-5 h-5 fill-gray-60" />}
            >
              <input
                type="text"
                id="input-group-1"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={clsx(
                  'bg-white border border-2 border-gray-30 text-gray-90 text-sm rounded-full focus:ring-orange focus:border-orange block w-full pl-10 p-2.5',
                  errors.name && touched.name && 'border-red-70',
                )}
                placeholder="Name"
              />
            </FormField>

            <FormField
              title="Your email"
              error={errors.email && touched.email ? errors.email : ''}
              icon={<EmailIcon className="w-5 h-5 fill-gray-60" />}
            >
              <input
                type="text"
                id="input-group-2"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className={clsx(
                  'bg-white border border-2 border-gray-30 text-gray-90 text-sm rounded-full focus:ring-orange focus:border-orange block w-full pl-10 p-2.5',
                  errors.email && touched.email && 'border-red-70',
                )}
                placeholder="Email"
              />
            </FormField>

            <FormField
              title="Your Message"
              error={errors.message && touched.message ? errors.message : ''}
              icon={<NotebookIcon className="w-5 h-5 fill-gray-60" />}
            >
              <input
                type="text"
                id="input-group-3"
                name="message"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
                className={clsx(
                  'bg-white border border-2 border-gray-30 text-gray-90 text-sm rounded-full focus:ring-orange focus:border-orange block w-full pl-10 p-2.5',
                  errors.message && touched.message && 'border-red-70',
                )}
                placeholder="Write to us"
              />
            </FormField>

            <FormUploadField setFieldValue={setFieldValue} values={values} />

            <button
              type="submit"
              className="disabled:bg-gray-30 flex justify-center items-center gap-2 text-white text-xl px-6 py-3 rounded-full bg-black hover:bg-orange"
              disabled={isLoading}
            >
              {isLoading && (
                <>
                  <SpinnerIcon className="w-6 h-6 animate-spin fill-orange" />
                  Processing...
                </>
              )}
              {!isLoading && "Let's discuss"}
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default GetInTouchForm;
