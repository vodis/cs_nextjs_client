'use client';

import React, {useEffect, useState} from 'react';
import { useUpdateLanguage } from "@src/api/language/useUpdateLanguage";
import { useDispatch, useSelector } from "react-redux";
import { updateLanguagesAndTranslations } from "@src/stores/actions/i18n/action";
import { clsx } from "clsx";

const Languages: React.FC = () => {
    const dispatch = useDispatch();
    const activeLanguage = useSelector(({ i18n }) => i18n.activeLanguage);
    const [selectedLanguage, setSelectedLanguage] = useState<null | string>(null);

    const {  data: language, mutate, isSuccess } = useUpdateLanguage(activeLanguage);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const language = (e.target as unknown as { value: string }).value;
        mutate(language);
        setSelectedLanguage(language);
    };

    useEffect(() => setSelectedLanguage(activeLanguage), []);

    useEffect(() => {
        if (isSuccess && !!language) {
            dispatch(updateLanguagesAndTranslations(language));
        }
    }, [dispatch, language, isSuccess]);

    return (
        <div className="flex flex-col gap-2" onClick={handleClick}>
            <button className={clsx("btn inline-flex", selectedLanguage === "EN" && "text-orange")} value="EN">EN</button>
            <button className={clsx("btn inline-flex", selectedLanguage === "UA" && "text-orange")} value="UA">UA</button>
            <button className={clsx("btn inline-flex", selectedLanguage === "PT" && "text-orange")} value="PT">PT</button>
        </div>
    );
}

export default Languages;
