import MovieCard from '../movie-card/movie-card';
import './movie-list.scss';
import { useAppSelector } from '../../redux/store';
import { TActorMovies } from '../../redux/actorSlice';
import Spinner from '../spinner/spinner';

type Opt<T> = T | null;

type TProps = {
  data: Opt<TActorMovies[]>;
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

  return <></>;
}

export default MovieList;