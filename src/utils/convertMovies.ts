import { YaApiMovie } from './types';

import convertMovie from './convertMovie';

export default function convertMovies(movies: YaApiMovie[]) {
  return movies.map(convertMovie);
}
