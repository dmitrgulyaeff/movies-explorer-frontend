import { useContext } from 'react';
import {
  MoviesContext,
  PathnameContext,
  ResponsesMoviesContext,
} from '../Contexts';
import fetchSavedMovies from '../utils/fetchSavedMovies';

export default async function useSavedMovies() {
  const { setSavedMovies } = useContext(MoviesContext);
  const { pathname } = useContext(PathnameContext);
  const { apiMoviesResponses, setApiMoviesResponses } = useContext(
    ResponsesMoviesContext
  );

  // TODO: добавить клик
  if (
    ['/saved-movies', '/movies'].includes(pathname) &&
    apiMoviesResponses.main?.success === undefined
  ) {
    const dataSavedMovies = await fetchSavedMovies();

    if (!dataSavedMovies) {
      setApiMoviesResponses((prevState) => {
        return { ...prevState, main: { success: false } };
      });
      return;
    }
    setSavedMovies(dataSavedMovies);
    setApiMoviesResponses((prevState) => {
      return { ...prevState, main: { success: true } };
    });
  }
}
