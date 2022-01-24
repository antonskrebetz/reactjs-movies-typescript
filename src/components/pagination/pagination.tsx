import DarkTheme from '../mui-theme/dark-theme';
import { useCallback } from 'react';
import { Pagination, ThemeProvider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles';
import { Opt } from '../../types/types';

type TBasicPagination = {
  actualPage: Opt<string>;
  query?: string;
  countPages: number;
}

const BasicPagination = ({actualPage, query, countPages = 10}: TBasicPagination): JSX.Element => {
  const DEFAULT_PAGE = 1;
  let url = useLocation();
  let navigate = useNavigate();

  const handlePageChange = useCallback((page) => {
    if (query) {
      navigate(`${url.pathname}?query=${query}&page=${page}`)
    } else {
      navigate(`${url.pathname}?page=${page}`)
    }
    window.scroll(0, 0);
  }, [navigate, query, url.pathname]);

  return (
    <ThemeProvider theme={DarkTheme}>
      <Pagination 
        page={actualPage ? +actualPage : DEFAULT_PAGE}
        count={countPages} 
        color="standard"
        hideNextButton
        hidePrevButton
        sx={styles.pagination}
        onChange={e => handlePageChange((e.target as HTMLElement).textContent)}
      />
    </ThemeProvider>
  );
}

export default BasicPagination;