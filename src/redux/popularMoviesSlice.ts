import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { httpService, _apiBase, _apiKey } from '../services/http-service';

type Opt<T> = T | null;

type TAsyncThunk = {
  lang: string;
  page: string;
}

export const fetchPopularMovies = createAsyncThunk(
  'popular/fetchPopularMovies',
  ({lang, page}: TAsyncThunk) => {
    const {request} = httpService();
    return request(`${_apiBase}movie/popular?${_apiKey}&language=${lang}&page=${page}`);
  }
);

type TSliceState ={
  popularMovies: Opt<TPopularMoviesItem[]>;
  totalPages: number;
  status: Opt<string>;
  error: Opt<boolean>;
}

type TPopularMoviesItem = {
  poster_path: string;
  genre_ids: number[];
  id: number;
  title: string;
  vote_average: number;
}

type TFulfilledAction = {
  results: TPopularMoviesItem[];
  total_pages: number;
}

const initialState: TSliceState = {
  popularMovies: null,
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
    [fetchPopularMovies.fulfilled.type]: (state, action: PayloadAction<TFulfilledAction>) => {
      state.status = 'resolved';
      state.popularMovies = action.payload.results;
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