import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { httpService, _apiBase, _apiKey } from '../services/http-service';

type Opt<T> = T | null;

type TAsyncThunk = {
  lang: string;
  page: string;
  query: string;
}

export const fetchSearchMovies = createAsyncThunk(
  'search/fetchSearchMovies',
  ({lang, query, page}: TAsyncThunk) => {
    const {request} = httpService();
    return request(`${_apiBase}search/movie?${_apiKey}&language=${lang}&query=${query}&page=${page}&include_adult=false`);
  }
);

type TSliceState ={
  searchMovies: Opt<TSearchMoviesItem[]>;
  totalPages: number;
  status: Opt<string>;
  error: Opt<boolean>;
}

type TSearchMoviesItem = {
  poster_path: string;
  genre_ids: number[];
  id: number;
  title: string;
  vote_average: number;
}

type TFulfilledAction = {
  results: TSearchMoviesItem[];
  total_pages: number;
}

const initialState: TSliceState = {
  searchMovies: null,
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
    [fetchSearchMovies.fulfilled.type]: (state, action: PayloadAction<TFulfilledAction>) => {
      state.status = 'resolved';
      state.searchMovies = action.payload.results;
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