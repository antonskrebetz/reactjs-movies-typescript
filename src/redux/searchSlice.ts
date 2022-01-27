import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { httpService, _apiBase, _apiKey } from '../services/http-service';
import { TAsyncThunkLangPageQuery, TMoviesSliceState, TFulfilledMoviesAction } from '../types/types';

export const fetchSearchMovies = createAsyncThunk(
  'search/fetchSearchMovies',
  ({lang, query, page}: TAsyncThunkLangPageQuery) => {
    const {request} = httpService();
    return request(`${_apiBase}search/movie?${_apiKey}&language=${lang}&query=${query}&page=${page}&include_adult=false`);
  }
);

const initialState: TMoviesSliceState = {
  movies: null,
  totalPages: 10,
  status: null,
  error: null
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSearchMovies.pending.type]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchSearchMovies.fulfilled.type]: (state, action: PayloadAction<TFulfilledMoviesAction>) => {
      state.status = 'resolved';
      state.movies = action.payload.results;
      state.totalPages = action.payload.total_pages;
    },
    [fetchSearchMovies.rejected.type]: (state, action: PayloadAction<boolean>) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  }
});

const {reducer} = searchSlice;
export default reducer;