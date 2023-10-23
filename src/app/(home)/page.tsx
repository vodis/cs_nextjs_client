import React from "react";
import AnimateTitle from "@src/components/AnimateTitle";
import AnimateText from "@src/components/AnimateText";

const SourcePage: React.FC = () => {
    return (
        <div className="h-full grid grid-cols-4 mx-auto md:grid-cols-7">
            <section className="flex items-start justify-center col-start-2 col-end-5 md:col-start-3 md:col-end-6">
                <div className="mt-10 md:mt-[25rem] w-full">
                    <AnimateTitle title="Unlock your potential" />
                    <div className="mt-4">
                        <AnimateText text="Technology led brands" dedicatedWordIndexes={[0]} transitionDelay="2.5s" />
                        <AnimateText text="transformation, inspired by" dedicatedWordIndexes={[1]} transitionDelay="4s" />
                        <AnimateText text="culture, drive by insights." dedicatedWordIndexes={[3]} transitionDelay="5.5s" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SourcePage;
