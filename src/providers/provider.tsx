'use client';

import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import createStore, { queryClient } from "@src/stores/createStore";

const store = createStore();
const client = queryClient();

const Provider = ({ children }: React.PropsWithChildren) => {
    return (
        <StoreProvider store={store}>
            <QueryClientProvider client={client}>
                { children }
            </QueryClientProvider>
        </StoreProvider>
    );
}

export default Provider;
