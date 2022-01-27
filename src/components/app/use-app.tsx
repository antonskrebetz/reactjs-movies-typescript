import { useEffect } from "react";
import { useAppDispatch } from "../../redux/store";
import {fetchMovieGenres} from '../../redux/appSlice';
import { useLang } from "../../services/use-lang";

export const useApp = () => {
  const dispatch = useAppDispatch();
  const {lang} = useLang();
  useEffect(() => {
    dispatch(fetchMovieGenres({lang}));
  }, [dispatch, lang])
}