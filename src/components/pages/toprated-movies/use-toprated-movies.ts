import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import { fetchTopMovies } from '../../../redux/topMoviesSlice';
import { useLang } from "../../../services/use-lang";

export const useTopratedMovies = (page: string) => {
  const dispatch = useAppDispatch();
  const {lang} = useLang();

  useEffect(() => {
    dispatch(
      fetchTopMovies({lang, page}))
  }, [dispatch, lang, page]);

  const {status} = useAppSelector(state => state.topReducer)
  const movies = useAppSelector(state => state.topReducer.topMovies);
  const totalPages = useAppSelector(state => state.topReducer.totalPages);
  const genresStatus = useAppSelector(state => state.appReducer.genresStatus);

  return {status, movies, totalPages, genresStatus};
}