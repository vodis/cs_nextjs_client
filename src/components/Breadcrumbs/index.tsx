'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Translate from "@vodis/ui-kit/i18n/Translate";
import styles from './breadcrumbs.module.scss';
import { IBreadcrumbs } from "./types";
import clsx from "clsx";

const Breadcrumbs: React.FC<IBreadcrumbs> = (props) => {
    const [animate, setAnimate] = useState<null | number>(null);
    const [activeUrlName, setActiveUrlName] = useState<string>();
    const pathname = usePathname();
    const router = useRouter();

    const handleNavigate = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
        e.preventDefault();
        router.push(url);
    };

    useEffect(() => {
        const findUrlByIndex = props.navigations.findIndex((link) => link.url === pathname);
        setActiveUrlName(props.navigations[findUrlByIndex].name);
        return () => {};
    }, [pathname, props.navigations])

    return (
        <div className="flex items-center justify-center w-full h-full relative">
            {activeUrlName &&
                <div className="md:hidden absolute text-white -rotate-90 left-1/2 -translate-x-2/4 bottom-64 whitespace-nowrap">
                    <Translate translationKey={activeUrlName} />
                </div>
            }
            <div className="absolute bottom-0 flex flex-col">
                {props.navigations.map((link, index) => {
                    return (
                        <button
                            key={link.name}
                            onClick={(e) => handleNavigate(e, link.url)}
                            onMouseEnter={() => setAnimate(index)}
                            onMouseLeave={() => setAnimate(null)}
                            onTouchStart={() => setAnimate(index)}
                            onTouchEnd={() => setAnimate(null)}
                            className={clsx(
                                `${styles['breadcrumbs_btn']}`,
                                'items-center justify-center relative',
                                link.url === pathname && `${styles['active']}`
                            )}
                        >
                                <span
                                    className={clsx(
                                        `${styles['breadcrumbs_btn__name']}`,
                                        'uppercase text-base',
                                        animate === index && `${styles['animate']}`,
                                        link.url === pathname && `${styles['active']}`,
                                        'hidden md:block'
                                    )}
                                >
                                    <Translate translationKey={link.name} />
                                </span>
                            <div
                                className={clsx(
                                    `${styles['breadcrumbs_btn__line']}`,
                                    animate === index && `${styles['animate']}`,
                                    link.url === pathname && `${styles['active']}`,
                                    'hidden md:block'
                                )}
                            ></div>
                            <div
                                className={clsx(
                                    `${styles['breadcrumbs_btn__pointer']}`,
                                    link.url === pathname && `${styles['active']}`
                                )}
                            ></div>
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default Breadcrumbs;
