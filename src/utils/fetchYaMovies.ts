import convertMovies from './convertMovies';
import moviesApi from './MoviesApi';

export default async function fetchYaMovies() {
  try {
    const response = await moviesApi.getMovies();
    const dataYaMovies = await response.json();
    const convertedMovies = convertMovies(dataYaMovies);
    return convertedMovies;
  } catch (error) {
    return undefined;
  }
}
