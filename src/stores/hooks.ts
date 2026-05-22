import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector as useReduxSelector } from 'react-redux';

import type { RootState } from './reducers/reducers';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
