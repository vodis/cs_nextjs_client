'use client';

import React, { useState } from 'react'
import { IMenu } from "@src/components/Menu/types"
import styles from './menu.module.scss'
import { clsx } from "clsx";

const Menu: React.FC<IMenu> = (props) => {
    const [isOpen, setIsOpen] = useState(false)

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
        </div>
    )
}

export default Menu;
