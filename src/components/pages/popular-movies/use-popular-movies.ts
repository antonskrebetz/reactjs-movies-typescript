import { useAppSelector, useAppDispatch } from "../../../redux/store";
import { useEffect } from "react";
import { fetchPopularMovies } from '../../../redux/popularMoviesSlice';
import { useLang } from "../../../services/use-lang";

export const usePopularMovies = (page: string) => {
  const dispatch = useAppDispatch();
  const {lang} = useLang();

  useEffect(() => {
    dispatch(fetchPopularMovies({lang, page}));
  }, [dispatch, page, lang]);

  const {status} = useAppSelector(state => state.popularReducer);
  const totalPages = useAppSelector(state => state.popularReducer.totalPages);
  const movies = useAppSelector(state => state.popularReducer.popularMovies);
  const genresStatus = useAppSelector(state => state.appReducer.genresStatus);

  return {status, totalPages, movies, genresStatus};
}