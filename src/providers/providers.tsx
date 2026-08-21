'use client';

import React, { useRef } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import createStore, { queryClient } from '@src/stores/createStore';
import LanguageProvider from '@src/providers/language/provider';

import '@src/api/api';

interface IProvidersProps extends React.PropsWithChildren {
  preloadedState?: AppState;
}

const Providers = ({ children, preloadedState }: IProvidersProps) => {
  const storeRef = useRef<ReturnType<typeof createStore>>();
  const queryClientRef = useRef<ReturnType<typeof queryClient>>();

  if (!storeRef.current) {
    storeRef.current = createStore(preloadedState);
  }

  if (!queryClientRef.current) {
    queryClientRef.current = queryClient();
  }

  return (
    <StoreProvider store={storeRef.current}>
      <QueryClientProvider client={queryClientRef.current}>
        <ReactQueryDevtools initialIsOpen={false} />
        <LanguageProvider>{children}</LanguageProvider>
      </QueryClientProvider>
    </StoreProvider>
  );
};

export default Providers;
