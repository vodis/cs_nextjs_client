import React from "react";

const Page404: React.FC = () => {
    return (
        <div className="w-full max-h-[calc(100vh-8rem)] flex-grow max-auto overflow-auto">
            <div className="h-full flex items-center justify-center">
                <h3 className="text-white"><span className="text-orange">404</span> | This page could not be found</h3>
            </div>
        </div>
    );
}

export default Page404;
