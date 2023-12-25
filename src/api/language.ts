import axios from "axios";
import { ILanguage } from "@src/types/entities/language";

export const getTranslationsAndLanguages = (activeLanguage: string) => axios
    .get<ILanguage>(`api/v1/translations/${activeLanguage}`)
    .then((resp) => resp.data);
