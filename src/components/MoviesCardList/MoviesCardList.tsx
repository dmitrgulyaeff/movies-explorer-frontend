import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

import {
  MoviesContext,
  PathnameContext,
  CurrentUserContext,
} from '../../Contexts';
import { useContext } from 'react';
import { Movie, MovieBd } from '../../utils/types';
import mainApi from '../../utils/MainApi';

export default function MoviesCardList() {
  const { currentUser } = useContext(CurrentUserContext);
  const { savedMovies, setSavedMovies, yaMovies, setYaMovies } =
    useContext(MoviesContext);
  const { pathname } = useContext(PathnameContext);

  const dislikeCard = async (movie: Movie) => {
    if (savedMovies) {
      const savedMovie = savedMovies.find(
        (movieBd) => movieBd.movieId === movie.movieId
      );
      if (savedMovie) {
        const response = await mainApi.deleteMovie(savedMovie._id.toString());
        if (response.ok) {
          const data = await response.json();
          const { _id, movieId } = data as MovieBd;
          const newSavedMovies = savedMovies.filter(
            (sMovie) => sMovie._id !== _id
          );
          setSavedMovies(newSavedMovies);
          setYaMovies((prevState: Movie[] | undefined) => {
            if (prevState !== undefined) {
              const updatedYaMovie = prevState.find(
                (movie) => movie.movieId === movieId
              );
              if (updatedYaMovie) {
                updatedYaMovie.owner = '';
                return prevState;
              }
            }
          });
        }
      }
    }
  };

  const likeCard = async (movie: Movie) => {
    const { owner, ...crMovie } = movie;
    const response = await mainApi.createMovie(crMovie);
    const data = (await response.json()) as MovieBd;
    // TODO: исправить типы MovieBd owner: { _id: string };
    // data.owner = {_id: JSON.stringify(data.owner).split('').filter(char => char !== `"`).join('')};
    await setSavedMovies((prevState: MovieBd[] | undefined) => {
      if (prevState !== undefined) {
        return [...prevState, data];
      }
    });

    setYaMovies((prevState: Movie[] | undefined) => {
      if (prevState !== undefined) {
        const updatedYaMovie = prevState.find(
          (movie) => movie.movieId === data.movieId
        );
        if (updatedYaMovie) {
          updatedYaMovie.owner = currentUser._id;
          return prevState;
        }
      }
    });
  };

  const Movie = (movie: Movie) => {
    const isLiked = currentUser._id === movie.owner;
    const handleLike = isLiked ? dislikeCard : likeCard;
    return MoviesCard({ movie, handleLike, isLiked, pathname });
  };

  return (
    <section className="movies">
      {pathname === '/movies' &&
        (yaMovies ? yaMovies.map(Movie) : <Preloader />)}
      {pathname === '/saved-movies' &&
        (savedMovies ? savedMovies.map(Movie) : <Preloader />)}
    </section>
  );
}
