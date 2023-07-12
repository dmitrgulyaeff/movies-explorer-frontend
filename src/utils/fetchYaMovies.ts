import convertMovies from './convertMovies';
import moviesApi from './MoviesApi';

export default async function fetchYaMovies() {
  const response = await moviesApi.getMovies();
  if (response.ok) {
    const dataYaMovies = await response.json();
    const convertedMovies = convertMovies(dataYaMovies);
    return convertedMovies;
  } else {
    return undefined;
  }
}
