import MovieCard from '../movie-card/movie-card';
import './movie-list.scss';
import { useAppSelector } from '../../redux/store';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import { Opt, TMoviesItem } from '../../types/types';

type TProps = {
  data: Opt<TMoviesItem[]>;
}

type TGenreItem = {
  id: number;
  name: string;
}

const MovieList = ({data}: TProps): JSX.Element => {
  const movieGenres = useAppSelector(state => state.appReducer.movieGenres);
  const genresStatus = useAppSelector(state => state.appReducer.genresStatus);
  
  if (genresStatus === 'loading') return <Spinner />;
  if (genresStatus === 'resolved') {
    return (
      <div className="movies">
        {
          data 
            ? data.map(el => 
              <MovieCard
                key={el.id} 
                id={el.id}
                vote={el.vote_average} 
                title={el.title}
                alt={el.title} 
                poster={el.poster_path}
                genres={el.genre_ids.map((item) => (movieGenres.filter((genre: TGenreItem) => genre.id === item)[0].name))}
              />)
            : null
        }
      </div>
    )
  };

  return <ErrorMessage/>;
}

export default MovieList;