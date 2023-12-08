import axios from "axios";
import { ILanguage } from "@src/types/entities/language";

export const getTranslationsAndLanguages = (activeLanguage) => axios
    .get<ILanguage>(`api/v1/translations/${activeLanguage}`)
    .then((resp) => resp.data);
