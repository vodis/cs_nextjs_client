import { useQuery } from "@tanstack/react-query";
import { getTranslationsAndLanguages } from "@src/api/language";

const queryKey = 'language';
export const getLanguageKey = [queryKey, 'get-language'];

export const useGetTranslationsAndLanguages = (language: string, options = {}) => useQuery({
    queryKey: getLanguageKey,
    queryFn: () => getTranslationsAndLanguages(language),
    ...options,
});
