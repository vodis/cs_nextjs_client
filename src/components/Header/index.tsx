import React, {PropsWithChildren} from "react";
import Image from "next/image";
import Link from "next/link";
import Translate from "@vodis/ui-kit/i18n/Translate";
import MailBox from "@src/components/MailBox";

export const Header: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <header className="z-20 h-16">
            <div className="h-full grid grid-cols-4 mx-auto md:grid-cols-7">
                <div className="z-20 flex items-center justify-center">
                    <Link href="/"><Image src="/logo.svg" alt="logo" width={50} height={50} /></Link>
                </div>
                <div className="flex items-center justify-center col-start-2 col-end-2 md:col-start-5 md:col-end-5">
                    <MailBox />
                </div>
                <div className="flex items-center justify-center col-start-3 col-end-3 md:col-start-6 md:col-end-6">
                    <Link href="https://app.craftscript.com" className="text-orange uppercase text-xs md:text-2xl"><Translate translationKey="Texts.launch-app"/></Link>
                </div>
                <div className="flex items-center justify-center col-start-4 col-end-4 md:col-start-7 md:col-end-7">
                    {children}
                </div>
            </div>
        </header>
    );
}
