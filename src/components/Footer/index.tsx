'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import LoaderNext from "@src/assets/icons/loader-next.svg";
import Breadcrumbs from "@src/components/Breadcrumbs";
import { NAVIGATIONS } from "@src/constants/navigations";

export const Footer: React.FC = () => {
    return (
        <footer className="z-10 h-16 relative">
            <div className="grid grid-cols-4 py-[15px] mx-auto md:grid-cols-7">
                <div className="flex items-center justify-center">
                    <Link href="https://github.com/vodis" className="border border-orange rounded-full p-1"><Image src="/assets/github-mark-orange.svg" alt="logo github" width={25} height={25} /></Link>
                </div>
                <div className="absolute bottom-4 hidden w-10 md:block md:left-[calc(50%-2rem)] md:w-16"><LoaderNext className="w-10 lg:w-14"/></div>
                <div className="flex items-center justify-center col-start-4 col-start-4 md:col-start-7 md:col-end-7">
                    <Breadcrumbs navigations={NAVIGATIONS} />
                </div>
            </div>
        </footer>
    );
}
