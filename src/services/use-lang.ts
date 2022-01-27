import { useAppSelector } from '../redux/store';

export const useLang = () => {
  const lang = useAppSelector(state => state.appReducer.lang);
  return {lang};
}