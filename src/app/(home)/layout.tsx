import React, {PropsWithChildren} from "react";

const HomeLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="w-full h-full max-auto">
            {children}
        </div>
    );
}

export default HomeLayout;
