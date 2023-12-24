import { useMutation } from "@tanstack/react-query";
import { getTranslationsAndLanguages } from "@src/api/language";

const queryKey = 'language';
export const getLanguageKey = [queryKey, 'get-language'];

export const useUpdateLanguage = (language: string, options = {}) => useMutation({
    mutationKey: getLanguageKey,
    mutationFn: (language: string) => getTranslationsAndLanguages(language),
    ...options,
});
