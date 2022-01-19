import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import { fetchUpcomingMovies } from "../../../redux/upcomingMoviesSlice";
import { useLang } from "../../../services/use-lang";

export const useUpcomingMovies = (page: string) => {
  const dispatch = useAppDispatch();
  const {lang} = useLang();

  useEffect(() => {
    dispatch(fetchUpcomingMovies({lang, page}))
  }, [dispatch, lang, page]);

  const { status } = useAppSelector(state => state.upcomingReducer);
  const movies = useAppSelector(state => state.upcomingReducer.upcomingMovies);
  const totalPages = useAppSelector(state => state.upcomingReducer.totalPages);
  const genresStatus = useAppSelector(state => state.appReducer.genresStatus);

  return {status, totalPages, movies, genresStatus};
}