import React from "react";
import Image from 'next/image';
import { clsx } from "clsx";
import { IInfoBox } from "@src/components/InfoBox/types";
import styles from './info-box.module.scss';

export const InfoBox: React.FC<IInfoBox> = ({ img, title , imgPosition= 'left',  children }) => {
    return (
        <>
            {imgPosition === "left" && (
                <div className="hidden rounded-lg lg:flex mt-5 mb-3 items-start justify-center ml-16 md:ml-0 col-start-1 col-end-2 md:col-start-2 md:col-end-3">
                    <div className={clsx(`${styles['info-box_img-container']}`)}>
                        {img && <Image src={img} alt={title} fill style={{ objectFit:"cover" }} />}
                    </div>
                </div>
            )}
            <div className="mt-5 mb-3 flex flex-col items-start justify-center col-start-1 col-end-5 md:col-start-3 md:col-end-6">
                <div className="lg:hidden w-full">
                    <div className={clsx(`${styles['info-box_img-container__mobile']}`)}>
                        {img && <Image src={img} alt={title} fill style={{ objectFit:"cover" }} />}
                    </div>
                </div>
                <div className={clsx(`${styles['info-box_content__mobile']}`, "w-full text-white")}>
                    {children}
                </div>
            </div>
            {imgPosition === "right" && (
                <div className="hidden rounded-lg lg:flex mt-5 mb-3 items-start justify-center ml-16 md:ml-0 col-start-5 col-end-6 md:col-start-6 md:col-end-7">
                    <div className={clsx(`${styles['info-box_img-container']}`)}>
                        {img && <Image src={img} alt={title} fill style={{ objectFit:"cover" }} />}
                    </div>
                </div>
            )}
        </>
    )
}
