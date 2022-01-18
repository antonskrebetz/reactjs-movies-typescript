import MovieCard from '../movie-card/movie-card';
import './movie-list.scss';
import { useAppSelector } from '../../redux/store';

type TDataResponse = {
  id: number;
  vote_average: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
}

type TProps = {
  data: TDataResponse[];
}

type TGenreItem = {
  id: number;
  name: string;
}

const MovieList = ({data}: TProps): JSX.Element => {
  const movieGenres = useAppSelector(state => state.appReducer.movieGenres);
  
  return (
    <div className="movies">
      {
        data.map(el => 
          <MovieCard
            key={el.id} 
            id={el.id}
            vote={el.vote_average} 
            title={el.title}
            alt={el.title} 
            poster={el.poster_path}
            genres={el.genre_ids.map((item) => (movieGenres.filter((genre: TGenreItem) => genre.id === item)[0].name))}
          />)
      }
    </div>
  )
}

export default MovieList;