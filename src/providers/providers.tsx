'use client';

import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import createStore, { queryClient } from "@src/stores/createStore";
import LanguageProvider from "@src/providers/language/provider";

export const Store = createStore();
export const QueryClient = queryClient();

const Providers = ({ children }: React.PropsWithChildren) => {
    return (
        <StoreProvider store={Store}>
            <QueryClientProvider client={QueryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <LanguageProvider>
                    { children }
                </LanguageProvider>
            </QueryClientProvider>
        </StoreProvider>
    );
}

export default Providers;
