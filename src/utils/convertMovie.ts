import { YaApiMovie, WebMovie } from './types';
import { baseUrlYaApi } from './constants';

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
    image: baseUrlYaApi + movie.image.url,
    thumbnail: baseUrlYaApi + movie.image.formats.thumbnail.url,
    movieId: movie.id,
  };
}
