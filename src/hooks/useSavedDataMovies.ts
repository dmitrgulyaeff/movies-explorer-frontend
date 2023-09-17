import { useContext } from 'react';
import {
  ButtonClickContext,
  MoviesContext,
  PathnameContext,
  ResponsesMoviesContext,
} from '../Contexts';
import fetchSavedMovies from '../utils/fetchSavedMovies';

export default async function useSavedMovies() {
  const { clickFrom, setClickFrom } = useContext(ButtonClickContext);
  const { setSavedMovies } = useContext(MoviesContext);
  const { pathname } = useContext(PathnameContext);
  const { apiMoviesResponses, setApiMoviesResponses } = useContext(
    ResponsesMoviesContext
  );

  if (
    ['/saved-movies', '/movies'].includes(clickFrom) &&
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
    if (pathname === '/saved-movies') {
      setClickFrom('')
    }
  }
}
