import getSimilarity from './getSimilarity';
import { Filter, WebMovie } from './types';

export default function filterMovie(filterObj: Filter, movie: WebMovie, isStrict: boolean) {
  const { showOnlyShortFilms, name } = filterObj;

  if (showOnlyShortFilms && movie.duration >= 40) {
    return false;
  }

  if (name === '' && !isStrict) return true;
  if (name === '' && isStrict) return false;

  if (name.length !== 0) {
    const { nameEN, nameRU } = movie;
    const filterNames = name.toLowerCase().match(/[a-z0-9а-я]+/gi);
    const names = nameEN
      .toLowerCase()
      .match(/[a-z0-9а-я]+/gi)
      ?.concat(nameRU.toLowerCase().match(/[a-z0-9а-я]+/gi) || []);

    if (filterNames && names) {
      if (
        !filterNames.some((filterName) =>
          names.some(
            (name) =>
              name.includes(filterName) || getSimilarity(filterName, name) > 0.6
          )
        )
      ) {
        return false;
      }
    }
  }

  return true;
}
