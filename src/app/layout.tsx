import 'react-toastify/dist/ReactToastify.min.css';
import './globals.css';

import { clsx } from 'clsx';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import React, { PropsWithChildren } from 'react';
import { Header } from "@src/components/Header";
import { Footer } from "@src/components/Footer";

const aeonikFono = localFont({
    variable: '--font-aeonik-fono',
    src: '../assets/fonts/AeonikFono/AeonikFono-Regular.ttf',
});

const kodeMono = localFont({
    variable: '--font-aeonik-fono',
    src: '../assets/fonts/KodeMono/KodeMono.ttf',
});

const neueHaasGrot = localFont({
    variable: '--font-neue-haas-grot',
    src: [
        {
            path: '../assets/fonts/NeueHaasGrotDisp/NeueHaasGrotDisp-45Light.otf',
            weight: '400',
            style: 'normal',
        },

        {
            path: '../assets/fonts/NeueHaasGrotDisp/NeueHaasGrotDisp-55Roman.otf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../assets/fonts/NeueHaasGrotDisp/NeueHaasGrotDisp-75Bold.otf',
            weight: '700',
            style: 'normal',
        },
    ],
});


export const metadata: Metadata = {
    title: 'Craft Script',
    description: 'Craft Script',
};

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <html lang="en">
        <body
            className={clsx(
                aeonikFono.variable,
                neueHaasGrot.variable,
                kodeMono.variable,
                'min-h-screen flex flex-col text-gray-100 leading-normal',
            )}
        >
        <main className="flex flex-1 flex-col bg-black">
            <Header/>
            {children}
            <Footer/>
        </main>
        </body>
        </html>
    );
};

export default RootLayout;
