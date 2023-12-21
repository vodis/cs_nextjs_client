'use client';

import React, { useState } from 'react';
import { IMenu } from "@src/components/Menu/types";
import Translate from "@vodis/ui-kit/i18n/Translate";
import styles from './menu.module.scss';
import { clsx } from "clsx";
import CloseBtn from "@src/components/CloseBtn";
import Languages from "@src/components/Languages";

const Menu: React.FC<IMenu> = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={`${styles['menu']}`}>
            <div className={`${styles['menu-btn']}`} onClick={handleOpen}>
                <div className={clsx(
                    'w-14',
                    `${styles['menu-ico']}`,
                    isOpen && `${styles['open']}`
                )}>
                    <div className={`w-full h-0.5 bg-orange ${styles['menu-ico_line__first']}`}></div>
                    <div className={`w-full h-0.5 bg-orange mt-2 ${styles['menu-ico_line__middle']}`}></div>
                    <div className={`w-full h-0.5 bg-orange mt-2 ${styles['menu-ico_line__last']}`}></div>
                </div>
            </div>
            <div className={clsx(
                "fixed flex flex-col justify-between top-0 right-0 w-full md:w-4/6 lg:w-3/6 xl:w-2/6 h-full z-10 bg-gradient-to-r from-gray-30 to-white overflow-y-auto",
                `${styles["menu-box"]}`,
                isOpen && `${styles["open"]}`
            )}>
                {
                    isOpen && (
                        <div className="fixed top-0 left-0 z-20 min-w-full grid grid-cols-4 md:grid-cols-7">
                            <div className="flex items-center justify-center h-16 col-start-4 col-end-4 md:col-start-7 md:col-end-7">
                                <CloseBtn onClose={handleOpen} className="w-8 md:w-10" />
                            </div>
                        </div>
                    )
                }
                <ul className="flex flex-col gap-8">
                    <li className="mr-6">
                        <a className="text-xl hover:text-orange uppercase" href="/"><Translate translationKey="Texts.side-menu-home" /></a>
                    </li>
                    <li className="mr-6">
                        <a className="text-xl hover:text-orange uppercase" href="/use-cases"><Translate translationKey="Texts.side-menu-products" /></a>
                    </li>
                </ul>
                <Languages />
            </div>
        </div>
    )
}

export default Menu;
