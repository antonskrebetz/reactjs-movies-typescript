import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { httpService, _apiBase, _apiKey } from '../services/http-service';
import { Opt, TMoviesItem, TAsyncThunkLangId, TAsyncThunkId } from '../types/types';

const {request} = httpService();

export const fetchPerson = createAsyncThunk(
  'actor/fetchPerson',
  ({id, lang}: TAsyncThunkLangId) => {
    return request(`${_apiBase}person/${id}?${_apiKey}&language=${lang}`);
  }
);

export const fetchActorImages = createAsyncThunk(
  'actor/fetchActorImages',
  ({id}: TAsyncThunkId) => {
    return request(`${_apiBase}person/${id}/images?${_apiKey}`);
  }
);

export const fetchActorMovies = createAsyncThunk(
  'actor/fetchActorMovies',
  ({id, lang}: TAsyncThunkLangId) => {
    return request(`${_apiBase}person/${id}/movie_credits?${_apiKey}&language=${lang}`);
  }
);

export type TFetchPerson = {
  name: string;
  birthday: string;
  profile_path: string;
  biography: string;
  place_of_birth: string;
}

export type TActorImages = {
  file_path: string;
}

type TActionActorImages = {
  profiles: TActorImages[];
}

type TActionActorMovies = {
  cast: TMoviesItem[];
}

type TSliceState = {
  personStatus: Opt<string>;
  personError: Opt<boolean>,
  personData: Opt<TFetchPerson>;
  imagesStatus: Opt<string>;
  imagesError: Opt<boolean>,
  actorImages: Opt<TActorImages[]>,
  moviesStatus: Opt<string>;
  moviesError: Opt<boolean>;
  movies: Opt<TMoviesItem[]>;
}

const initialState: TSliceState = {
  personStatus: null,
  personError: null,
  personData: null,
  imagesStatus: null,
  imagesError: null,
  actorImages: null,
  moviesStatus: null,
  moviesError: null,
  movies: null,
};

const actorSlice = createSlice({
  name: 'actor',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPerson.pending.type]: (state) => {
      state.personStatus = 'loading';
      state.personError = null;
    },
    [fetchPerson.fulfilled.type]: (state, action: PayloadAction<TFetchPerson>) => {
      state.personStatus = 'resolved';
      state.personData = action.payload;
    },
    [fetchPerson.rejected.type]: (state, action: PayloadAction<boolean>) => {
      state.personStatus = 'rejected';
      state.personError = action.payload;
    },
    [fetchActorImages.pending.type]: (state) => {
      state.imagesStatus = 'loading';
      state.imagesError = null;
    },
    [fetchActorImages.fulfilled.type]: (state, action: PayloadAction<TActionActorImages>) => {
      state.imagesStatus = 'resolved';
      state.actorImages = action.payload.profiles.slice(0, 4);
    },
    [fetchActorImages.rejected.type]: (state, action: PayloadAction<boolean>) => {
      state.imagesStatus = 'rejected';
      state.imagesError = action.payload;
    },
    [fetchActorMovies.pending.type]: (state) => {
      state.moviesStatus = 'loading';
      state.moviesError = null;
    },
    [fetchActorMovies.fulfilled.type]: (state, action: PayloadAction<TActionActorMovies>) => {
      state.moviesStatus = 'resolved';
      state.movies = action.payload.cast;
    },
    [fetchActorMovies.rejected.type]: (state, action: PayloadAction<boolean>) => {
      state.moviesStatus = 'rejected';
      state.moviesError =  action.payload;
    },
  }
});

const {reducer} = actorSlice;
export default reducer;