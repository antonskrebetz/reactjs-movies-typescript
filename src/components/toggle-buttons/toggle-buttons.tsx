import {useState} from 'react';
import { Link } from "react-router-dom";
import { ThemeProvider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import DarkTheme from '../mui-theme/dark-theme';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import styles from './styles';

const ToggleButtons = (): JSX.Element => {
  const url = useLocation();
  const { t } = useTranslation();
  const [alignment, setAlignment] = useState(url.pathname);

  const handleChange = (event: React.MouseEvent, value: string) => {
    setAlignment(value);
  };

  return (
    <ThemeProvider theme={DarkTheme}>
      <ToggleButtonGroup 
        sx={styles.togglebtns}
        size="small"
        color="success"
        value={alignment}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="/" component={Link} to="/">{t('toggleBtnsPopMovies')}</ToggleButton>
        <ToggleButton value="/toprated" component={Link} to="/toprated">{t('toggleBtnsTopMovies')}</ToggleButton>
        <ToggleButton value="/upcoming" component={Link} to="/upcoming">{t('toggleBtnsUpMovies')}</ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>
  );
}

export default ToggleButtons;