import './MoviesCard.css';

import { Movie } from '../../utils/types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface MoviesCardProps {
  movie: Movie;
  isLiked: boolean;
  handleLike: (movie: Movie) => void;
  pathname: string;
}

const minutesToString = (minutes: number) => {
  const hh = Math.floor(minutes / 60);
  const mm = minutes % 60;
  return `${!!hh ? hh + 'ч' : ''}${mm + 'м'}`;
};

export default function MoviesCard({ movie, isLiked, handleLike, pathname }: MoviesCardProps) {
  const { image, nameRU, duration, movieId, trailerLink } = movie;
  const btnClass = classNames(
    { 'movie__btn-like': pathname === '/movies' },
    {
      'movie__btn-like_active':
        pathname === '/movies' && isLiked,
    },
    { 'movie__btn-cross': pathname === '/saved-movies' }
  );

  return (
    <article className="movie" key={movieId.toString()}>
      <Link className='movie__link' to={trailerLink} target="_blank">
        <img className="movie__image" src={image} alt={nameRU} />
      </Link>
      <h4 className="movie__name">{nameRU}</h4>
      <p className="movie__duration">{minutesToString(duration)}</p>
      <button className={btnClass} onClick={() => handleLike(movie)}/>
    </article>
  );
}
