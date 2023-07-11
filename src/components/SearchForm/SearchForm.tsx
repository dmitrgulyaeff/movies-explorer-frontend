import './SearchForm.css';
import { ReactComponent as Loupe } from '../../images/icons/loupe.svg';
import Toggle from '../Toggle/Toggle';
import { useState, ChangeEvent } from 'react';
import classNames from 'classnames';

export default function SearchForm() {
  const [showShortFilms, setShowShortFilms] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <section className="search">
      <form className="search__form" action="">
        <Loupe className="search__loupe-icon" />
        <input
          className="search__input"
          type="text"
          placeholder="Фильм"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="search__button" type="submit" title="поиск">
          <Loupe />
        </button>
      </form>
      <div className="search__line" />
      <Toggle
        className="search__toggle"
        enabled={showShortFilms}
        toggle={() => setShowShortFilms(!showShortFilms)}
      />
      <p className="search__shortfilms-text">Короткометражки</p>
    </section>
  );
}
