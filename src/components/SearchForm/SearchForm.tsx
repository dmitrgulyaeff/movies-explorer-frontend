import './SearchForm.css';
import { ReactComponent as Loupe } from '../../images/icons/loupe.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState, ChangeEvent, useContext, FormEvent, useEffect } from 'react';
import { FilterContext } from '../../Contexts';

export default function SearchForm() {
  const { filter, setFilter } = useContext(FilterContext);
  const [showOnlyShortFilms, setShowShortFilms] = useState(filter.showOnlyShortFilms);
  const [name, setNameRU] = useState(filter.name || '');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameRU(event.target.value);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (name.length !== 0) {
      setFilter({...filter, name});
    } else {
      setFilter({...filter, name : ''});
    }
  };

  useEffect(() => {
    if (filter.showOnlyShortFilms !== showOnlyShortFilms) {
      setFilter({ ...filter, showOnlyShortFilms: showOnlyShortFilms});
    }
  }, [filter, setFilter, showOnlyShortFilms]);

  return (
    // TODO: form.action ??
    <section className="search">
      <form className="search__form" action="" onSubmit={onSubmit}>
        <Loupe className="search__loupe-icon" />
        <input
          className="search__input"
          type="text"
          placeholder="Фильм"
          value={name}
          onChange={handleInputChange}
        />
        <button className="search__button" type="submit" title="поиск">
          <Loupe />
        </button>
      </form>
      <div className="search__line" />
      <FilterCheckbox
        className="search__toggle"
        enabled={showOnlyShortFilms}
        toggle={() => setShowShortFilms(!showOnlyShortFilms)}
      />
      <p className="search__shortfilms-text">Короткометражки</p>
    </section>
  );
}
