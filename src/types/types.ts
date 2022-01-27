export type Opt<T> = T | null;

export type TAsyncThunkLangPage = {
  lang: string;
  page: string;
}

export type TAsyncThunkLang = {
  lang: string;
}

export type TAsyncThunkLangPageQuery = {
  lang: string;
  page: string;
  query: string;
}

export type TAsyncThunkLangId = {
  id: string;
  lang: string;
}

export type TAsyncThunkId = {
  id: string;
}

export type TMoviesItem = {
  poster_path: string;
  genre_ids: number[];
  id: number;
  title: string;
  vote_average: number;
}

export type TFulfilledMoviesAction = {
  results: TMoviesItem[];
  total_pages: number;
}

export type TMoviesSliceState ={
  movies: Opt<TMoviesItem[]>;
  totalPages: number;
  status: Opt<string>;
  error: Opt<boolean>;
}