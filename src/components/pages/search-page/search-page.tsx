import BasicPagination from '../../pagination/pagination';
import MovieList from '../../movie-list/movie-list';
import ErrorBoundary from '../../error-boundary/error-boundary';
import Spinner from '../../spinner/spinner';
import { useSearchPage } from './use-search-page';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import './search-page.scss';

const SearchPage = (): JSX.Element => {
  let [searchParams] = useSearchParams();
  let queryText = searchParams.get("query");
  let queryPage = searchParams.get("page");

  const {status, totalPages, movies, genresStatus} = useSearchPage(queryText as string, queryPage as string);
  const { t } = useTranslation();
  
  return (
    <>
      <h2 className="search-results">
        {movies ? 
          movies.length 
            ? `${t('searchResl')}: «${queryText}»` 
            : `NO RESULTS FOUND: «${queryText}»`
          : null
        }
      </h2>
      {status === 'loading' && <Spinner/>}
      <ErrorBoundary>
        {genresStatus === 'loading' && movies ? <Spinner/> : <MovieList data={movies}/>}
      </ErrorBoundary>
      {queryText 
        ? <BasicPagination actualPage={queryPage} query={queryText} countPages={totalPages}/> 
        : <BasicPagination actualPage={queryPage} countPages={totalPages}/>
      }
    </>
  )
}

export default SearchPage;