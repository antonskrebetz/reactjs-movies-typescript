import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import { fetchPerson, fetchActorImages, fetchActorMovies, TFetchPerson, TActorImages, TActorMovies } from '../../../redux/actorSlice';
import { useLang } from "../../../services/use-lang";

export const useActorPage = (id: string) => {
  const dispatch = useAppDispatch();
  const {lang} = useLang();

  useEffect(() => {
    dispatch(fetchPerson({id, lang}))
    dispatch(fetchActorImages({id}));
    dispatch(fetchActorMovies({id, lang}));
  }, [id, dispatch, lang]);

  const personData = useAppSelector(state => state.actorReducer.personData);
  const {personStatus, imagesStatus, moviesStatus} = useAppSelector(state => state.actorReducer);
  const movies = useAppSelector(state => state.actorReducer.actorMovies);
  const images = useAppSelector(state => state.actorReducer.actorImages);

  return {personStatus, imagesStatus, moviesStatus, personData, movies, images} as {
    personData: TFetchPerson;
    personStatus: string;
    imagesStatus: string;
    moviesStatus: string;
    movies: TActorMovies[];
    images: TActorImages[];
  };
}