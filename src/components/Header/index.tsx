import React, {PropsWithChildren} from "react";
import Image from "next/image";
import Link from "next/link";

export const Header: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <header className="z-10">
            <div className="grid grid-cols-4 py-[15px] mx-auto md:grid-cols-7">
                <div className="flex items-center justify-center">
                    <Link href="/"><Image src="/logo.svg" alt="logo" width={50} height={50} /></Link>
                </div>
                <div className="flex items-center justify-center col-start-2 col-start-2 md:col-start-5 md:col-start-5">
                    <Link href="/contact-us" className="text-orange uppercase text-xs md:text-2xl">Get in touch</Link>
                </div>
                <div className="flex items-center justify-center col-start-3 col-start-3 md:col-start-6 md:col-end-6">
                    <Link href="https://app.craftscript.com" className="text-orange uppercase text-xs md:text-2xl">Launch app</Link>
                </div>
                <div className="flex items-center justify-center col-start-4 col-start-4 md:col-start-7 md:col-end-7">
                    {children}
                </div>
            </div>
        </header>
    );
}
