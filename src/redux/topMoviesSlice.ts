import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { httpService, _apiBase, _apiKey } from '../services/http-service';
import { TAsyncThunkLangPage, TMoviesSliceState, TFulfilledMoviesAction } from '../types/types';

export const fetchTopMovies = createAsyncThunk(
  'top/fetchTopMovies',
  ({lang, page}: TAsyncThunkLangPage) => {
    const {request} = httpService();
    return request(`${_apiBase}movie/top_rated?${_apiKey}&language=${lang}&page=${page}`);
  }
);

const initialState: TMoviesSliceState = {
  movies: null,
  totalPages: 10,
  status: null,
  error: null
};

const topSlice = createSlice({
  name: 'top',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTopMovies.pending.type]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTopMovies.fulfilled.type]: (state, action: PayloadAction<TFulfilledMoviesAction>) => {
      state.status = 'resolved';
      state.movies = action.payload.results;
      state.totalPages = action.payload.total_pages;
    },
    [fetchTopMovies.rejected.type]: (state, action: PayloadAction<boolean>) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  }
});

const {reducer} = topSlice;
export default reducer;