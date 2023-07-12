import { MovieYaApi } from './types';

import convertMovie from './convertMovie';

export default function convertMovies(movies: MovieYaApi[]) {
  return movies.map(convertMovie);
}
