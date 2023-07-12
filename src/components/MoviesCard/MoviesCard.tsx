import { Movie } from '../../utils/types';

interface MoviesCardProps extends Movie {}

export default function MoviesCard({image, nameRU, duration, movieId} : MoviesCardProps) {
  return (
    <article key={movieId.toString()} >
      <img src={image} alt={nameRU} />
      <h4>{nameRU}</h4>
      <p>{duration}</p>
    </article>
  );
}
