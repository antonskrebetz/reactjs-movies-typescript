import { useState, ChangeEvent, KeyboardEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { changeLanguage, changeSearchText } from '../../redux/appSlice';
import i18n from "../../i18n/i18n";
import { useNavigate } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material";

export const useHeader = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const handleChangeLang = (e: SelectChangeEvent<string>): void => {
    dispatch(changeLanguage({value: e.target.value}));
    i18n.changeLanguage(e.target.value);
  };

  const lang = useAppSelector(state => state.appReducer.lang);

  const hadleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchText((e.currentTarget.value));
  };

  const submitSearchForm = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(changeSearchText({text: searchText}));
      navigate(`/search?query=${searchText}`);
      setSearchText('');
    }
  }

  return {searchText, setSearchText, lang, handleChangeLang, hadleChangeInput, submitSearchForm};
}