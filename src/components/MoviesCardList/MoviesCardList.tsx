import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

import {
  MoviesContext,
  PathnameContext,
  CurrentUserContext,
} from '../../Contexts';
import { useContext, useEffect, useState } from 'react';
import { WebMovie, BdMovie } from '../../utils/types';
import mainApi from '../../utils/MainApi';
import { getInitialCardsCount } from '../../utils/getInitialCardsCount';
import { getCardsCountForMore } from '../../utils/getCardsCountForMore';

export default function MoviesCardList({ movies }: { movies: WebMovie[] }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { savedMovies, setSavedMovies, setYaMovies } =
    useContext(MoviesContext);
  const { pathname } = useContext(PathnameContext);

  const [count, setCount] = useState<number | undefined>();

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    setCount(getInitialCardsCount(innerWidth));
  }, [innerWidth]);

  useEffect(() => {
    const handleWindowResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const dislikeCard = async (movie: WebMovie) => {
    if (savedMovies) {
      const savedMovie = savedMovies.find(
        (movieBd) => movieBd.movieId === movie.movieId
      );
      if (savedMovie) {
        try {
          const response = await mainApi.deleteMovie(savedMovie._id.toString());
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
        } catch (error) {
          console.error('Ошибка удаления карточки');
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
    return MoviesCard({ movie, handleLike, isLiked, pathname });
  };

  return (
    <section className="movies">
      <ul className="movies__list">
        {movies.map(createMovieHelper).slice(0, count)}
      </ul>

      {count !== undefined && count < movies.length && (
        <button
          className="movies__button-more"
          onClick={() => {
            setCount(
              (prevCount) => getCardsCountForMore(innerWidth) + prevCount!
            );
          }}
        >
          Ещё
        </button>
      )}
    </section>
  );
}
