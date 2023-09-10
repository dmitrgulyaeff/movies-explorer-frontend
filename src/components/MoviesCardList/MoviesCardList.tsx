import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

import {
  MoviesContext,
  PathnameContext,
  CurrentUserContext,
  FilterContext,
} from '../../Contexts';
import { useContext } from 'react';
import { WebMovie, BdMovie } from '../../utils/types';
import mainApi from '../../utils/MainApi';
import filterMovie from '../../utils/filterMovie';

export default function MoviesCardList({movies}: {movies: WebMovie[]}) {
  const { currentUser } = useContext(CurrentUserContext);
  const { savedMovies, setSavedMovies, yaMovies, setYaMovies } =
    useContext(MoviesContext);
  const { pathname } = useContext(PathnameContext);
  const { filter } = useContext(FilterContext);

  const dislikeCard = async (movie: WebMovie) => {
    if (savedMovies) {
      const savedMovie = savedMovies.find(
        (movieBd) => movieBd.movieId === movie.movieId
      );
      if (savedMovie) {
        const response = await mainApi.deleteMovie(savedMovie._id.toString());
        if (response.ok) {
          const data = await response.json();
          const { _id, movieId } = data as BdMovie;
          const newSavedMovies = savedMovies.filter(
            (sMovie) => sMovie._id !== _id
          );
          setSavedMovies(newSavedMovies);
          setYaMovies((prevState: WebMovie[] | undefined) => {
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

  const likeCard = async (movie: WebMovie) => {
    const { owner, ...crMovie } = movie;
    const response = await mainApi.createMovie(crMovie);
    const data = (await response.json()) as BdMovie;
    await setSavedMovies((prevState: BdMovie[] | undefined) => {
      if (prevState !== undefined) {
        return [...prevState, data];
      }
    });

    setYaMovies((prevState: WebMovie[] | undefined) => {
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

  const createMovieHelper = (movie: WebMovie) => {
    const isLiked = !!movie?.owner;
    const handleLike = isLiked ? dislikeCard : likeCard;
    // if (filterMovie(filter, movie)) {
      return MoviesCard({ movie, handleLike, isLiked, pathname });
    // }
  };

  return (
    <section className="movies">
      {movies.map(createMovieHelper)}
      {/* {pathname === '/movies' &&
        (yaMovies ? yaMovies.map(createMovieHelper) : <Preloader />)}
      {pathname === '/saved-movies' &&
        (savedMovies ? savedMovies.map(createMovieHelper) : <Preloader />)} */}
    </section>
  );
}
