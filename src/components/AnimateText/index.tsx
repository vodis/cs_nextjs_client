import React, { useCallback } from 'react'
import styles from './animate-text.module.scss';
import { IAnimateText } from "./types";

const AnimateText: React.FC<IAnimateText> = ({ text, dedicatedWordIndexes= [], transitionDelay= '0s'}) => {
    const breakpoint = /\,|\.|\?|\!/g;
    const getBreakpointBack = useCallback((word: string) => {
        if (/\,/.test(word)) {
            return ",";
        }
        if (/\./.test(word)) {
            return ".";
        }
        if (/\?/.test(word)) {
            return "?";
        }
        if (/\!/.test(word)) {
            return "!";
        }
    }, []);
    return (
        <div className={`${styles['animate-text']}`} style={{ animationDelay: transitionDelay }}>
            <span className="text-white text-xl tracking-wide md:text-4xl md:tracking-[.2rem]">
                {text.split(" ").map((word, i, arr) => {
                    const separateFromSigns = word.split(breakpoint);
                    return (
                        <span key={word + i} className="mr-3">
                            {dedicatedWordIndexes?.some((wordIndex) => wordIndex === i) ? (
                                <>
                                    <span className="text-orange">{separateFromSigns[0]}</span>
                                    {separateFromSigns.length > 1 ? <span>{getBreakpointBack(word)}</span> : null}
                                </>
                            ) : word}
                        </span>
                    );
                })}
            </span>
        </div>
    )
}

export default AnimateText;
