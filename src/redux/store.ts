import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import appReducer from './appSlice';
import popularReducer from './popularMoviesSlice';
import topReducer from './topMoviesSlice';
import upcomingReducer from './upcomingMoviesSlice';
import searchReducer from './searchSlice';
import actorReducer from './actorSlice';
import movieReducer from './movieSlice';

const store = configureStore({
  reducer: {
    appReducer,
    popularReducer,
    topReducer, 
    upcomingReducer,
    searchReducer,
    actorReducer,
    movieReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;