import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/store';
import { fetchMovie, fetchMovieImages, fetchMovieCast, fetchMovieRecommend, toggleCastList, TMovieData, TMovieCastItem, TMovieImagesItem, TMovieRecommendItem } from '../../../redux/movieSlice';
import { useLang } from '../../../services/use-lang';

export const useMoviePage = (id: string) => {
  const dispatch = useAppDispatch();
  const {lang} = useLang();

  useEffect(() => {
    dispatch(fetchMovie({id, lang}));
    dispatch(fetchMovieImages({id}));
    dispatch(fetchMovieCast({id, lang}));
    dispatch(fetchMovieRecommend({id, lang}));
  }, [dispatch, id, lang]);

  const togglelCastItems = (): void => {
    dispatch(toggleCastList());
  }

  const {movieStatus, imagesStatus, castStatus, recommendStatus} = useAppSelector(state => state.movieReducer);
  const movieData = useAppSelector(state => state.movieReducer.movieData);
  const isShortListCast = useAppSelector(state => state.movieReducer.isShortListCast);
  const shortListCast = useAppSelector(state => state.movieReducer.shortListCast);
  const movieCast = useAppSelector(state => state.movieReducer.movieCast);
  const movieImages = useAppSelector(state => state.movieReducer.movieImages);
  const movieRecommend = useAppSelector(state => state.movieReducer.movieRecommend);

  return {movieStatus, imagesStatus, castStatus, recommendStatus, movieData, isShortListCast, shortListCast, movieCast, movieImages, movieRecommend, togglelCastItems} as {
    movieStatus: string;
    imagesStatus: string;
    castStatus: string;
    recommendStatus: string;
    movieData: TMovieData;
    isShortListCast: boolean;
    shortListCast: TMovieCastItem[];
    movieCast: TMovieCastItem[];
    movieImages: TMovieImagesItem[];
    movieRecommend: TMovieRecommendItem[];
    togglelCastItems: () => void;
  };
}