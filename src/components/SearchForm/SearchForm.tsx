import './SearchForm.css';
import { ReactComponent as Loupe } from '../../images/icons/loupe.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState, ChangeEvent, useContext, FormEvent, useEffect } from 'react';
import {
  ButtonClickContext,
  FilterContext,
  PathnameContext,
} from '../../Contexts';
import classNames from 'classnames';

export default function SearchForm() {
  const { clickFrom, setClickFrom } = useContext(ButtonClickContext);
  const { pathname } = useContext(PathnameContext);
  const { filter, setFilter } = useContext(FilterContext);
  const [showOnlyShortFilms, setShowShortFilms] = useState(
    filter.showOnlyShortFilms
  );
  const [name, setNameRU] = useState(filter.name || '');
  const [validForm, setValidForm] = useState(true);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameRU(event.target.value);
  };

  // TODO:  снести после level-2 <
  useEffect(() => {
    if (name === 'о') {
      if (!clickFrom) {
        setClickFrom('/movies');
      }
    }
  }, [clickFrom, name, setClickFrom]);
  // TODO >

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (name === '') {
      setValidForm(false);
    } else {
      // get Data
      if (!clickFrom) {
        setClickFrom(pathname);
      }

      // filter
      if (name.length !== 0) {
        setFilter({ ...filter, name });
      } else {
        setFilter({ ...filter, name: '' });
      }
    }
  };
  useEffect(() => {
    if (name || validForm) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [name, validForm]);
  useEffect(() => {
    if (filter.showOnlyShortFilms !== showOnlyShortFilms) {
      setFilter({ ...filter, showOnlyShortFilms: showOnlyShortFilms });
    }
  }, [filter, setFilter, showOnlyShortFilms]);

  return (
    // TODO: form.action ??
    <section
      className={classNames('search', {
        search_invalid: !validForm,
      })}
    >
      <form className="search__form" action="" onSubmit={onSubmit}>
        <Loupe className="search__loupe-icon" />
        <input
          className={classNames('search__input', {
            search__input_invalid: !validForm,
          })}
          type="text"
          placeholder={validForm ? 'Фильм' : 'Нужно ввести ключевое слово'}
          value={name}
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
      <div className="search__line" />
      <FilterCheckbox
        className={classNames('search__toggle', {
          search__toggle_invalid: !validForm,
        })}
        enabled={showOnlyShortFilms}
        toggle={() => setShowShortFilms(!showOnlyShortFilms)}
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
