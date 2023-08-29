import mainApi from "./MainApi";
import { MovieBd } from "./types";

export default async function fetchSavedMovies() {
  const response = await mainApi.getMovies();
  if (response.ok) {
    const dataSavedMovies = await response.json();
    return dataSavedMovies as MovieBd[];
  } else {
    return undefined;
  }
}