import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useContext, useEffect } from 'react';
import { MoviesContext, CurrentUserContext } from '../../Contexts';
import fetchYaMovies from '../../utils/fetchYaMovies';
import fetchSavedMovies from '../../utils/fetchSavedMovies';

export default function Movies() {
  const { savedMovies, setSavedMovies, setYaMovies } =
    useContext(MoviesContext);
  const { user } = useContext(CurrentUserContext);

  useEffect(() => {
    async function setNormalizedYaMovies() {
      if (user) {
        let convertedMovies;
        let dataSavedMovies;

        if (!savedMovies) {
          [convertedMovies, dataSavedMovies] = await Promise.all([
            fetchYaMovies(),
            fetchSavedMovies(),
          ]);
        } else {
          convertedMovies = await fetchYaMovies();
          dataSavedMovies = savedMovies;
        }

        if (!convertedMovies || !dataSavedMovies) {
          //TODO: «Ничего не найдено»
          setYaMovies([]);
          return;
        }

        const idSavedMovies = new Set(
          dataSavedMovies.map((m) => {
            if (m.owner._id === user._id) {
              return m.movieId;
            }
            return undefined;
          })
        );

        const yaMoviesWithLikes = convertedMovies.map((movie) => {
          if (idSavedMovies.has(movie.movieId)) {
            movie.owner._id = user._id;
          }
          return movie;
        });
        setYaMovies(yaMoviesWithLikes);
      }
    }

    setNormalizedYaMovies();
  }, [savedMovies, setSavedMovies, setYaMovies, user]);

  return (
    <main className="main_route_movies">
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}
