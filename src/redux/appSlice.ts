import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { httpService, _apiBase, _apiKey } from '../services/http-service';
import { Opt, TAsyncThunkLang } from '../types/types';

export const fetchMovieGenres = createAsyncThunk(
  'app/fetchMovieGenres',
  ({lang}: TAsyncThunkLang) => {
    const {request} = httpService()
    return request(`${_apiBase}genre/movie/list?${_apiKey}&language=${lang}`);
  }
)

type TMovieGenresItem = {
  id: number;
  name: string;
}

type TActionChangeLanguage = {
  value: string;
}

type TActionChangeSearchText = {
  text: string;
}

type TActionGenres = {
  genres: TMovieGenresItem[]
}

type TSliceState ={
  lang: string;
  query: Opt<string>;
  genresStatus: Opt<string>;
  genresError: Opt<boolean>;
  movieGenres: TMovieGenresItem[];
}

const initialState: TSliceState = {
  lang: 'en',
  query: 'search',
  genresStatus: null,
  genresError: null,
  movieGenres: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeLanguage(state, action: PayloadAction<TActionChangeLanguage>) {
      state.lang = action.payload.value
    },
    changeSearchText(state, action: PayloadAction<TActionChangeSearchText>) {
      state.query = action.payload.text
    }
  },
  extraReducers: {
    [fetchMovieGenres.pending.type]: (state) => {
      state.genresStatus = 'loading';
      state.genresError = null;
    },
    [fetchMovieGenres.fulfilled.type]: (state, action: PayloadAction<TActionGenres>) => {
      state.genresStatus = 'resolved';
      state.movieGenres = action.payload.genres;
    },
    [fetchMovieGenres.rejected.type]: (state, action: PayloadAction<boolean>) => {
      state.genresStatus = 'rejected';
      state.genresError = action.payload;
    },
  }
});

const {actions, reducer} = appSlice;
export default reducer;
export const {
  changeLanguage,
  changeSearchText
} = actions;