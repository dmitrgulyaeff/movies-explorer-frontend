import {
  CurrentUserContext,
  MoviesContext,
  PathnameContext,
} from '../Contexts';
import { useContext } from 'react';
import fetchYaMovies from '../utils/fetchYaMovies';

export default async function useNormalizedYaMovies() {
  const { savedMovies, yaMovies, setYaMovies } = useContext(MoviesContext);
  const { currentUser } = useContext(CurrentUserContext);
  const { pathname } = useContext(PathnameContext);

  if (
    ['/movies'].includes(pathname) &&
    !yaMovies &&
    currentUser &&
    savedMovies
  ) {
    const convertedMovies = await fetchYaMovies();
    if (!convertedMovies) {
      // TODO: «Ничего не найдено» ошибка получения от Яндекса
      setYaMovies([]);
      return;
    }

    const idSavedMovies = new Set(
      savedMovies.map((m) => {
        if (m.owner === currentUser._id) {
          return m.movieId;
        }
        return undefined;
      })
    );

    const yaMoviesWithLikes = convertedMovies.map((movie) => {
      if (idSavedMovies.has(movie.movieId)) {
        movie.owner = currentUser._id;
      }
      return movie;
    });
    setYaMovies(yaMoviesWithLikes);
  }
}
