import React from "react";
import AnimateTitle from "@src/components/AnimateTitle";
import Head from "next/head";

const SourcePage: React.FC = () => {
    return (
        <div>
            <Head>
                <title>My page title</title>
                <meta property="og:title" content="My page title" key="title" />
            </Head>
            <div className="h-full grid grid-cols-4 mx-auto md:grid-cols-7">
                <section className="flex items-start justify-center col-start-2 col-end-4 md:col-start-3 md:col-end-6">
                    <div className="flex flex-col mt-10 md:mt-[30rem] w-full">
                        <AnimateTitle title="Unlock your potential" />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SourcePage;
