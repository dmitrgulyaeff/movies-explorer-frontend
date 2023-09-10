import {
  ButtonClickContext,
  CurrentUserContext,
  MoviesContext,
  PathnameContext,
  ResponsesMoviesContext,
} from '../Contexts';
import { useContext } from 'react';
import fetchYaMovies from '../utils/fetchYaMovies';

export default async function useNormalizedYaMovies() {
  const { clickFrom, setClickFrom } = useContext(ButtonClickContext);
  const { savedMovies, yaMovies, setYaMovies } = useContext(MoviesContext);
  const { currentUser } = useContext(CurrentUserContext);
  const { pathname } = useContext(PathnameContext);
  const { apiMoviesResponses, setApiMoviesResponses } = useContext(
    ResponsesMoviesContext
  );

  if (
    ['/movies'].includes(clickFrom) &&
    ['/movies'].includes(pathname) &&
    !yaMovies &&
    savedMovies &&
    currentUser &&
    apiMoviesResponses.ya?.success === undefined
  ) {
    const convertedMovies = await fetchYaMovies();
    if (!convertedMovies) {
      setApiMoviesResponses((prevState) => {
        return { ...prevState, ya: { success: false } };
      });
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
    setApiMoviesResponses((prevState) => {
      return { ...prevState, ya: { success: true } };
    });
    setClickFrom('')
  }
}
