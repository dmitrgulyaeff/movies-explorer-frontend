import { YaApiMovie, WebMovie } from './types';
import { BASE_URL_YA_API } from './constants';

export default function convertMovie(movie: YaApiMovie): WebMovie {
  return {
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    trailerLink: movie.trailerLink,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
    image: BASE_URL_YA_API + movie.image.url,
    thumbnail: BASE_URL_YA_API + movie.image.formats.thumbnail.url,
    movieId: movie.id,
  };
}
