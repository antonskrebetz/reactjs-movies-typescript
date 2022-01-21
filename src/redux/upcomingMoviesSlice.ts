import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { httpService, _apiBase, _apiKey } from '../services/http-service';
import { TAsyncThunkLangPage, TMoviesSliceState, TFulfilledMoviesAction } from '../types/types';
 
export const fetchUpcomingMovies = createAsyncThunk(
  'upcoming/fetchUpcomingMovies',
  ({lang, page}: TAsyncThunkLangPage) => {
    const {request} = httpService()
    return request(`${_apiBase}movie/upcoming?${_apiKey}&language=${lang}&page=${page}`);
  }
);

const initialState: TMoviesSliceState = {
  movies: null,
  totalPages: 10,
  status: null,
  error: null
};

const upcomingSlice = createSlice({
  name: 'upcoming',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUpcomingMovies.pending.type]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchUpcomingMovies.fulfilled.type]: (state, action: PayloadAction<TFulfilledMoviesAction>) => {
      state.status = 'resolved';
      state.movies = action.payload.results;
      state.totalPages = action.payload.total_pages;
    },
    [fetchUpcomingMovies.rejected.type]: (state, action: PayloadAction<boolean>) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  }
});

const {reducer} = upcomingSlice;
export default reducer;