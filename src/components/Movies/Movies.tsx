import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useContext, useEffect } from 'react';
import {
  MoviesContext,
  CurrentUserContext,
  PathnameContext,
} from '../../Contexts';
import fetchYaMovies from '../../utils/fetchYaMovies';
import fetchSavedMovies from '../../utils/fetchSavedMovies';

export default function Movies() {
  const { savedMovies, setSavedMovies, yaMovies, setYaMovies } =
    useContext(MoviesContext);
  const { currentUser } = useContext(CurrentUserContext);
  const { pathname } = useContext(PathnameContext);

  useEffect(() => {
    async function setNormalizedYaMovies() {
      if (currentUser) {
        if (!savedMovies) {
          await setSavedDataMovies();
          return;
        }

        const convertedMovies = await fetchYaMovies();
        if (!convertedMovies) {
          // TODO: «Ничего не найдено» ошибка получения от Яндекса
          setYaMovies([]);
          return;
        }

        const idSavedMovies = new Set(
          savedMovies.map((m) => {
            if (m.owner._id === currentUser._id) {
              return m.movieId;
            }
            return undefined;
          })
        );

        const yaMoviesWithLikes = convertedMovies.map((movie) => {
          if (idSavedMovies.has(movie.movieId)) {
            movie.owner._id = currentUser._id;
          }
          return movie;
        });
        setYaMovies(yaMoviesWithLikes);
      }
    }

    async function setSavedDataMovies() {
      const dataSavedMovies = await fetchSavedMovies();
      if (!dataSavedMovies) {
        // TODO: «Ничего не найдено» ошибка получения сохраненных
        setSavedMovies([]);
        return;
      }
      setSavedMovies(dataSavedMovies);
    }

    async function fetchData() {
      if (pathname === '/movies' && !yaMovies) {
        await setNormalizedYaMovies();
      } else if (pathname === '/saved-movies' && !savedMovies) {
        await setSavedDataMovies();
      }
    }

    fetchData();
  }, [
    pathname,
    savedMovies,
    setSavedMovies,
    setYaMovies,
    currentUser,
    yaMovies,
  ]);

  return (
    <main className="main__movies">
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}
