import './MoviesCard.css'

import { User } from '../../utils/types';
import { Movie } from '../../utils/types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface MoviesCardProps {
  movie: Movie,
  user?: User,
  pathname: string
}

const minutesToString = ( minutes: number) => {
  const hh = Math.floor(minutes / 60);
  const mm = minutes % 60;
  return `${!!hh ? (hh + 'ч') : ''}${mm + 'м'}`
}

export default function MoviesCard({movie, user, pathname} : MoviesCardProps) {
  const {image, nameRU, duration, movieId, owner, trailerLink} = movie;
  const btnClass = classNames(
    {'movie__btn-like': pathname === '/movies'}, 
    {'movie__btn-like_active':  user && pathname === '/movies' && (user._id === owner._id)},
    {'movie__btn-cross': user && pathname === '/saved-movies'}
  )

  return (
    <article className='movie' key={movieId.toString()} >
      <Link to={trailerLink} target="_blank">
      <img className='movie__image' src={image} alt={nameRU} />
      </Link>
      <h4 className='movie__name'>{nameRU}</h4>
      <p className='movie__duration'>{minutesToString(duration)}</p>
      <button className={btnClass}/>
    </article>
  );
}
