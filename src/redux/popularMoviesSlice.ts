import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { httpService, _apiBase, _apiKey } from '../services/http-service';
import { TMoviesSliceState, TAsyncThunkLangPage, TFulfilledMoviesAction } from '../types/types';

export const fetchPopularMovies = createAsyncThunk(
  'popular/fetchPopularMovies',
  ({lang, page}: TAsyncThunkLangPage) => {
    const {request} = httpService();
    return request(`${_apiBase}movie/popular?${_apiKey}&language=${lang}&page=${page}`);
  }
);

const initialState: TMoviesSliceState = {
  movies: null,
  totalPages: 10,
  status: null,
  error: null
};

const popularSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPopularMovies.pending.type]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchPopularMovies.fulfilled.type]: (state, action: PayloadAction<TFulfilledMoviesAction>) => {
      state.status = 'resolved';
      state.movies = action.payload.results;
      state.totalPages = action.payload.total_pages;
    },
    [fetchPopularMovies.rejected.type]: (state, action: PayloadAction<boolean>) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  }
});

const {reducer} = popularSlice;
export default reducer;