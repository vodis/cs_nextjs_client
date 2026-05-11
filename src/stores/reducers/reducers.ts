import { combineReducers } from 'redux';

import i18nReducer from './i18n/reducer';

const rootReducer = combineReducers({
  i18n: i18nReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  type AppState = ReturnType<typeof rootReducer>;
  type AppSelector<T = unknown> = (state: AppState) => T;
}

// With this, `useSelector(state => ...)` automatically infers `state` param as `AppState`
declare module 'react-redux' {
  interface DefaultRootState extends AppState {}
}
