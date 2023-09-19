import './MainMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import useSavedMovies from '../../hooks/useSavedDataMovies';
import useNormalizedYaMovies from '../../hooks/useNormalizedYaMovies';
import { useContext, useEffect, useState } from 'react';
import {
  ButtonClickContext,
  FilterContext,
  MoviesContext,
  PathnameContext,
  ResponsesMoviesContext,
} from '../../Contexts';
import Preloader from '../Preloader/Preloader';
import { WebMovie } from '../../utils/types';
import filterMovie from '../../utils/filterMovie';
import Message from '../Message/Message';
import {
  BEFORE_REQ_MSG,
  ERR_SERVER_MSG,
  NOT_FOUND_MSG,
  SAVED_YA_FILMS_STORAGE_KEY,
} from '../../utils/constants';

export default function Movies() {
  const { clickFrom } = useContext(ButtonClickContext);
  const { pathname } = useContext(PathnameContext);
  const { savedMovies, yaMovies } = useContext(MoviesContext);
  const { apiMoviesResponses } = useContext(ResponsesMoviesContext);
  const { filter } = useContext(FilterContext);
  const { setClickFrom } = useContext(ButtonClickContext);

  const [storageYaMovies, setStorageYaMovies] = useState<WebMovie[] | null>();

  useSavedMovies();
  useNormalizedYaMovies();
  const renderMovies = (
    movies: WebMovie[] | undefined,
    responseSuccess: boolean | undefined
  ) => {
    // поиск ранее уже был на /movies
    if (pathname === '/movies' && !movies && storageYaMovies) {
      const filteredMovies = storageYaMovies.filter((movie) =>
        filterMovie(filter, movie, true)
      );
      if (filteredMovies.length === 0) {
        return <Message>{NOT_FOUND_MSG}</Message>;
      }
      return <MoviesCardList movies={filteredMovies} />;
    }

    // Поиска не было
    if (!clickFrom && responseSuccess === undefined) {
      return <Message>{BEFORE_REQ_MSG}</Message>;
    }

    // Загрузка
    if (responseSuccess === undefined) {
      return <Preloader />;
    }
    // Ошибка
    if (!responseSuccess) {
      return <Message>{ERR_SERVER_MSG}</Message>;
    }

    // Найдено
    if (movies) {
      const filteredMovies = movies.filter((movie) =>
        filterMovie(filter, movie, pathname === '/movies')
      );
      if (filteredMovies.length === 0) {
        return <Message>{NOT_FOUND_MSG}</Message>;
      }
      return <MoviesCardList movies={filteredMovies} />;
    }
  };

  useEffect(() => {
    if (yaMovies !== undefined) {
      localStorage.setItem(
        SAVED_YA_FILMS_STORAGE_KEY,
        JSON.stringify(yaMovies)
      );
    }
  }, [yaMovies]);

  useEffect(() => {
    if (storageYaMovies === undefined) {
      const localStorageYaMovies = localStorage.getItem(
        SAVED_YA_FILMS_STORAGE_KEY
      );
      if (localStorageYaMovies !== null) {
        setStorageYaMovies(JSON.parse(localStorageYaMovies));
      } else {
        setStorageYaMovies(null);
      }
    }
  }, [storageYaMovies]);

  useEffect(() => {
    // получить сохр. фильмы при переходе на страницу сохр.-фильмы
    if (pathname === '/saved-movies' && !savedMovies) {
      setClickFrom(pathname);
      // получить сохр. фильмы при переходе на страницу фильмы + есть фильмы в localStorage
    } else if (pathname === '/movies' && !yaMovies && storageYaMovies) {
      setClickFrom(pathname);
    }
  }, [pathname, savedMovies, setClickFrom, storageYaMovies, yaMovies]);

  return (
    <main className="main-movies">
      <SearchForm />
      {pathname === '/saved-movies' &&
        renderMovies(savedMovies, apiMoviesResponses.main?.success)}

      {pathname === '/movies' &&
        renderMovies(
          yaMovies,
          apiMoviesResponses.main?.success && apiMoviesResponses.ya?.success
        )}
    </main>
  );
}
