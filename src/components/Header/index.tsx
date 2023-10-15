import React, {PropsWithChildren} from "react";
import Image from "next/image";

export const Header: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <header>
            <div className="max-w-screen-xl grid grid-cols-[120px_1fr_120px] py-[15px] px-[75px] mx-auto items-center justify-between">
                <div className="flex gap-[10px] items-center">
                    <Image src="/assets/logo.svg" alt="logo" width={50} height={500} />
                </div>
                <div className="flex flex-col items-center justify-center">
                    {children}
                </div>
            </div>
        </header>
    );
}
