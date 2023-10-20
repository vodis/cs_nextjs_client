import React from 'react'
import styles from './animate-title.module.scss';
import { IAnimateTitle } from "@src/components/AnimateTitle/types";

const AnimateTitle: React.FC<IAnimateTitle> = (props) => {
    return (
        <div className={`${styles['animate-title']} relative items-start justify-center`}>
            <div className={`${styles['animate-title_slash']} bg-orange`}></div>
            <div className={`${styles['animate-title_bg']} bg-orange h-2 absolute top-1.5 -left-2 -z-10`}></div>
            <span className="text-white uppercase text-xs tracking-widest md:text-sm">
                {props.title}
            </span>
        </div>
    )
}

export default AnimateTitle;
