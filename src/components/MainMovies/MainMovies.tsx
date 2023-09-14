import './MainMovies.css';
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
import Message from '../Message/Message';
import { beforeReqMsg, errServerMsg, notFoundMsg } from '../../utils/constants';

export default function Movies() {
  const { clickFrom } = useContext(ButtonClickContext);
  const { pathname } = useContext(PathnameContext);
  const { savedMovies, yaMovies } = useContext(MoviesContext);
  const { apiMoviesResponses } = useContext(ResponsesMoviesContext);
  const { filter } = useContext(FilterContext);

  useSavedMovies();
  useNormalizedYaMovies();

  const renderMovies = (
    movies: WebMovie[] | undefined,
    responseSuccess: boolean | undefined
  ) => {
    // Поиска не было
    if (!clickFrom && responseSuccess === undefined) {
      return <Message>{beforeReqMsg}</Message>;
    }

    // Загрузка
    if (responseSuccess === undefined) {
      return <Preloader />;
    }
    // Ошибка
    if (!responseSuccess) {
      return <Message>{errServerMsg}</Message>;
    }

    // Найдено
    if (movies) {
      const filteredMovies = movies.filter((movie) =>
        filterMovie(filter, movie)
      );
      if (filteredMovies.length === 0) {
        return <Message>{notFoundMsg}</Message>;
      }
      return <MoviesCardList movies={filteredMovies} />;
    }
  };

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
