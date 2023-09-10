import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import useSavedMovies from '../../hooks/useSavedDataMovies';
import useNormalizedYaMovies from '../../hooks/useNormalizedYaMovies';
import { useContext } from 'react';
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

export default function Movies() {
  const { clickFrom } = useContext(ButtonClickContext);
  const { pathname } = useContext(PathnameContext);
  const { savedMovies, yaMovies } = useContext(MoviesContext);
  const { apiMoviesResponses } = useContext(ResponsesMoviesContext);
  const { filter } = useContext(FilterContext);

  useSavedMovies();
  useNormalizedYaMovies();

  //TODO: вынести в отдельный компонент
  const Msg = ({ children }: { children: string }) => (
    <p style={{ color: 'white' }}>{children}</p>
  );

  const renderMovies = (
    movies: WebMovie[] | undefined,
    responseSuccess: boolean | undefined
  ) => {
    // Поиска не было
    if (!clickFrom && responseSuccess === undefined) {
      return <Msg>Поиска не было</Msg>;
    }

    // Загрузка
    if (responseSuccess === undefined) {
      return <Preloader />;
    }
    // Ошибка
    if (!responseSuccess) {
      return <Msg>Ошибка получения данных от сервера</Msg>;
    }

    // Найдено
    if (movies) {
      const filteredMovies = movies.filter((movie) =>
        filterMovie(filter, movie)
      );
      if (filteredMovies.length === 0) {
        return <Msg>По вашему запросу: Ничего не найдено</Msg>;
      }
      return <MoviesCardList movies={filteredMovies} />;
    }
  };

  return (
    <main className="main__movies">
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
