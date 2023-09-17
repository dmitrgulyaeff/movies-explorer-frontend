import './SearchForm.css';
import { ReactComponent as Loupe } from '../../images/icons/loupe.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState, ChangeEvent, useContext, useEffect, useCallback } from 'react';
import {
  ButtonClickContext,
  FilterContext,
  PathnameContext,
} from '../../Contexts';
import classNames from 'classnames';

export default function SearchForm() {
  const { setClickFrom } = useContext(ButtonClickContext);
  const { pathname } = useContext(PathnameContext);
  const { filter, setFilter } = useContext(FilterContext);
  const [showOnlyShortFilms, setShowShortFilms] = useState(
    filter.showOnlyShortFilms
  );
  const [nameRu, setNameRU] = useState(filter.name);
  const [validForm, setValidForm] = useState(true);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameRU(event.target.value);
  };

  const onSubmit = useCallback(
    () => {
    if (pathname === '/movies' && nameRu === '') {
      setFilter({ name: '', showOnlyShortFilms});
      setValidForm(false);
    } else {
      // get Data
      setClickFrom(pathname);

      // filter
      setFilter({ showOnlyShortFilms, name: nameRu });
      if (pathname === '/movies') localStorage.setItem('name', nameRu);
    }
  }, [nameRu, pathname, setClickFrom, setFilter, showOnlyShortFilms]);

  useEffect(() => {
    setValidForm(!!(nameRu || validForm));
  }, [nameRu, validForm]);

  useEffect(() => {
    if (pathname === '/movies') {
      const name = localStorage.getItem('name') || '';
      const showOnlyShortFilms =
        localStorage.getItem('showOnlyShortFilms') === 'true';
      setShowShortFilms(showOnlyShortFilms);
      setNameRU(name);
      setFilter({ showOnlyShortFilms, name });
    } else if (pathname === '/saved-movies') {
      setValidForm(true);
      setShowShortFilms(false);
      setNameRU('');
      setFilter({ showOnlyShortFilms: false, name: '' });
    }
  }, [pathname, setFilter]);

  useEffect(() => {
    if (pathname === '/movies') {
      localStorage.setItem('showOnlyShortFilms', String(showOnlyShortFilms));
    }
  }, [showOnlyShortFilms, pathname]);

  useEffect(() => {
    if (filter.showOnlyShortFilms !== showOnlyShortFilms) {
      onSubmit()
    }
  }, [filter.showOnlyShortFilms, onSubmit, showOnlyShortFilms])

  return (
    <section
      className={classNames('search', {
        search_invalid: !validForm,
      })}
    >
      <form
        className="search__form"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <Loupe className="search__loupe-icon" />
        <input
          className={classNames('search__input', {
            search__input_invalid: !validForm,
          })}
          type="text"
          placeholder={validForm ? 'Фильм' : 'Нужно ввести ключевое слово'}
          value={nameRu}
          onChange={handleInputChange}
        ></input>
        <button
          className={classNames('search__button', {
            search__button_invalid: !validForm,
          })}
          type="submit"
          title="поиск"
        >
          <Loupe />
        </button>
      </form>
      <hr className="search__separator" />
      <FilterCheckbox
        className={classNames('search__toggle', {
          search__toggle_invalid: !validForm,
        })}
        enabled={showOnlyShortFilms}
        toggle={() => {setShowShortFilms((prev) => !prev)}}
      />
      <p
        className={classNames('search__shortfilms-text', {
          'search__shortfilms-text_invalid': !validForm,
        })}
      >
        Короткометражки
      </p>
    </section>
  );
}
