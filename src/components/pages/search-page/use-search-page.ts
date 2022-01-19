import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import { fetchSearchMovies } from "../../../redux/searchSlice";
import { useLang } from "../../../services/use-lang";

export const useSearchPage = (query: string, page: string) => {
  const dispatch = useAppDispatch();
  const {lang} = useLang();

  useEffect(() => {
    dispatch(fetchSearchMovies({lang, query, page}))
  }, [dispatch, query, lang, page]);

  const { status } = useAppSelector(state => state.searchReducer);
  const movies = useAppSelector(state => state.searchReducer.searchMovies);
  const totalPages = useAppSelector(state => state.searchReducer.totalPages);
  const genresStatus = useAppSelector(state => state.appReducer.genresStatus);

  return {status, totalPages, movies, genresStatus};
}