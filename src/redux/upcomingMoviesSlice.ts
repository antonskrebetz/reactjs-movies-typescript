import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { httpService, _apiBase, _apiKey } from '../services/http-service';

type Opt<T> = T | null;

type TAsyncThunk = {
  lang: string;
  page: string;
}

export const fetchUpcomingMovies = createAsyncThunk(
  'upcoming/fetchUpcomingMovies',
  ({lang, page}: TAsyncThunk) => {
    const {request} = httpService()
    return request(`${_apiBase}movie/upcoming?${_apiKey}&language=${lang}&page=${page}`);
  }
);

type TSliceState ={
  upcomingMovies: Opt<TUpcomMoviesItem[]>;
  totalPages: number;
  status: Opt<string>;
  error: Opt<boolean>;
}

type TUpcomMoviesItem = {
  poster_path: string;
  genre_ids: number[];
  id: number;
  title: string;
  vote_average: number;
}

type TFulfilledAction = {
  results: TUpcomMoviesItem[];
  total_pages: number;
}

const initialState: TSliceState = {
  upcomingMovies: null,
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
    [fetchUpcomingMovies.fulfilled.type]: (state, action: PayloadAction<TFulfilledAction>) => {
      state.status = 'resolved';
      state.upcomingMovies = action.payload.results;
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