import { useContext } from 'react';
import { MoviesContext, PathnameContext } from '../Contexts';
import fetchSavedMovies from '../utils/fetchSavedMovies';

export default async function useSavedMovies() {
  const { setSavedMovies, savedMovies } = useContext(MoviesContext);
  const { pathname } = useContext(PathnameContext);

  if (['/saved-movies', '/movies'].includes(pathname) && !savedMovies) {
    const dataSavedMovies = await fetchSavedMovies();
    if (!dataSavedMovies) {
      // TODO: «Ничего не найдено» ошибка получения сохраненных
      setSavedMovies([]);
      return;
    }
    setSavedMovies(dataSavedMovies);
  }
}
