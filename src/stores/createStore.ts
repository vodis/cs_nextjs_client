"use client";

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/reducers";
import { QueryClient } from "@tanstack/query-core";

export default function createAppStore(preloadedState?: AppState) {
    const store = configureStore({
        reducer: rootReducer,
        preloadedState,
    })

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept(() => {
            store.replaceReducer(require('./reducers/reducers'));
        });
    }

    return store
}

export function queryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 2000 * 60,
            },
        },
    });
}

declare global {
    interface NodeModule {
        hot?: {
            accept: (cb: () => void) => void
        }
    }
}
