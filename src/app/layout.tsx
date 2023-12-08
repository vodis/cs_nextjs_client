import 'react-toastify/dist/ReactToastify.min.css';
import './globals.css';

import React, { PropsWithChildren } from 'react';
import Provider from "@src/providers/provider";
import { clsx } from 'clsx';
import localFont from 'next/font/local';
import { Header } from "@src/components/Header";
import { Footer } from "@src/components/Footer";
import Menu from "@src/components/Menu";
import DynamicBg from "@src/components/DynamicBg";

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

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <html lang="en">
        <body
            className={clsx(
                aeonikFono.variable,
                neueHaasGrot.variable,
                kodeMono.variable,
                'text-gray-100 leading-normal',
            )}
        >
        <main className="h-full flex flex-1 flex-col bg-black">
            <Provider>
                <Header>
                    <Menu/>
                </Header>
                <DynamicBg />
                {children}
                <Footer/>
            </Provider>
        </main>
        </body>
        </html>
    );
};

export default RootLayout;
