'use client';

import React from 'react'
import { ICloseBtn } from "./types"
import styles from './close-btn.module.scss'
import clsx from "clsx";

const CloseBtn: React.FC<ICloseBtn> = (props) => {
    return (
        <div className={`${styles['close']}`} onClick={props.onClose}>
            <div className={`${styles['close-btn']}`}>
                <div className={clsx(props?.className ? props.className : 'w-14')}>
                    <div className={`w-full h-0.5 bg-orange ${styles['close-btn_line__first']}`}></div>
                    <div className={`w-full h-0.5 bg-orange mt-2 ${styles['close-btn_line__last']}`}></div>
                </div>
            </div>
        </div>
    )
}

export default CloseBtn;
