import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { httpService, _apiBase, _apiKey } from '../services/http-service';

type Opt<T> = T | null;

type TAsyncThunk = {
  lang: string;
  page: string;
}

export const fetchTopMovies = createAsyncThunk(
  'top/fetchTopMovies',
  ({lang, page}: TAsyncThunk) => {
    const {request} = httpService();
    return request(`${_apiBase}movie/top_rated?${_apiKey}&language=${lang}&page=${page}`);
  }
);

type TSliceState ={
  topMovies: Opt<TTopMoviesItem[]>;
  totalPages: number;
  status: Opt<string>;
  error: Opt<boolean>;
}

type TTopMoviesItem = {
  poster_path: string;
  genre_ids: number[];
  id: number;
  title: string;
  vote_average: number;
}

type TFulfilledAction = {
  results: TTopMoviesItem[];
  total_pages: number;
}

const initialState: TSliceState = {
  topMovies: null,
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
    [fetchTopMovies.fulfilled.type]: (state, action: PayloadAction<TFulfilledAction>) => {
      state.status = 'resolved';
      state.topMovies = action.payload.results;
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