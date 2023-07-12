import mainApi from "./MainApi";
import { Movie } from "./types";

export default async function fetchSavedMovies() {
  const response = await mainApi.getMovies();
  if (response.ok) {
    const dataSavedMovies = await response.json();
    return dataSavedMovies as Movie[];
  } else {
    return undefined;
  }
}