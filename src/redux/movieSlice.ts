import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { httpService, _apiBase, _apiKey } from '../services/http-service';
import { Opt, TMoviesItem, TAsyncThunkLangId, TAsyncThunkId } from '../types/types';

const {request} = httpService();

export const fetchMovie = createAsyncThunk(
  'movie/fetchMovie',
  ({id, lang}: TAsyncThunkLangId) => {
    return request(`${_apiBase}movie/${id}?${_apiKey}&language=${lang}`);
  }
);

export const fetchMovieImages = createAsyncThunk(
  'movie/fetchMovieImages',
  ({id}: TAsyncThunkId) => {
    return request(`${_apiBase}movie/${id}/images?${_apiKey}`);
  }
);

export const fetchMovieCast = createAsyncThunk(
  'movie/fetchMovieCast',
  ({id, lang}: TAsyncThunkLangId) => {
    return request(`${_apiBase}movie/${id}/credits?${_apiKey}&language=${lang}`);
  }
);

export const fetchMovieRecommend = createAsyncThunk(
  'movie/fetchMovieRecommend',
  async ({id, lang}: TAsyncThunkLangId) => {
    return request(`${_apiBase}movie/${id}/recommendations?${_apiKey}&language=${lang}`);
  }
);

type TMovieGenresItem = {
  id: number;
  name: string;
}

export type TMovieData = {
  poster_path: string;
  runtime: number;
  title: string;
  overview: string;
  release_date: string;
  budget: number;
  genres: TMovieGenresItem[];
}

export type TMovieImagesItem = {
  file_path: string;
}

type TActionMovieImages = {
  backdrops: TMovieImagesItem[];
}

export type TMovieCastItem = {
  id: number;
  profile_path: string;
  name: string;
  character: string;
}

type TActionMovieCast = {
  cast: TMovieCastItem[];
}

type TActionMovieRecommend = {
  results: TMoviesItem[];
}

type TSliceState = {
  movieStatus: Opt<string>;
  movieError: Opt<boolean>;
  movieData: Opt<TMovieData>;
  imagesStatus: Opt<string>;
  imagesError: Opt<boolean>;
  movieImages: Opt<TMovieImagesItem[]>;
  castStatus: Opt<string>;
  castError: Opt<boolean>;
  movieCast: Opt<TMovieCastItem[]>;
  isShortListCast: boolean;
  shortListCast: Opt<TMovieCastItem[]>;
  recommendStatus: Opt<string>;
  recommendError: Opt<boolean>;
  movieRecommend: Opt<TMoviesItem[]>;
};

const initialState: TSliceState = {
  movieStatus: null,
  movieError: null,
  movieData: null,
  imagesStatus: null,
  imagesError: null,
  movieImages: null,
  castStatus: null,
  castError: null,
  movieCast: null,
  isShortListCast: true,
  shortListCast: null,
  recommendStatus: null,
  recommendError: null,
  movieRecommend: null,
};

const movieSlice = createSlice({
  name: 'actor',
  initialState,
  reducers: {
    toggleCastList(state) {
      state.isShortListCast = !state.isShortListCast
    },
  },
  extraReducers: {
    [fetchMovie.pending.type]: (state) => {
      state.movieStatus = 'loading';
      state.movieError = null;
    },
    [fetchMovie.fulfilled.type]: (state, action: PayloadAction<TMovieData>) => {
      state.movieStatus = 'resolved';
      state.movieData = action.payload;
    },
    [fetchMovie.rejected.type]: (state, action) => {
      state.movieStatus = 'rejected';
      state.movieError = action.payload;
    },
    [fetchMovieImages.pending.type]: (state) => {
      state.imagesStatus = 'loading';
      state.imagesError = null;
    },
    [fetchMovieImages.fulfilled.type]: (state, action: PayloadAction<TActionMovieImages>) => {
      state.imagesStatus = 'resolved';
      state.movieImages = action.payload.backdrops.slice(0,8);
    },
    [fetchMovieImages.rejected.type]: (state, action) => {
      state.imagesStatus = 'rejected';
      state.imagesError = action.payload;
    },
    [fetchMovieCast.pending.type]: (state) => {
      state.castStatus = 'loading';
      state.castError = null;
    },
    [fetchMovieCast.fulfilled.type]: (state, action: PayloadAction<TActionMovieCast>) => {
      state.castStatus = 'resolved';
      state.movieCast = action.payload.cast;
      state.shortListCast = action.payload.cast.slice(0, 6);
    },
    [fetchMovieCast.rejected.type]: (state, action) => {
      state.castStatus = 'rejected';
      state.castError = action.payload;
    },
    [fetchMovieRecommend.pending.type]: (state) => {
      state.recommendStatus = 'loading';
      state.recommendError = null;
    },
    [fetchMovieRecommend.fulfilled.type]: (state, action: PayloadAction<TActionMovieRecommend>) => {
      state.recommendStatus = 'resolved';
      state.movieRecommend = action.payload.results.slice(0, 5);
    },
    [fetchMovieRecommend.rejected.type]: (state, action) => {
      state.recommendStatus = 'rejected';
      state.recommendError = action.payload;
    },
  }
});

const {actions, reducer} = movieSlice;
export default reducer;
export const {toggleCastList} = actions;