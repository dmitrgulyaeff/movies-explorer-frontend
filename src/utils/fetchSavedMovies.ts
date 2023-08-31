import mainApi from "./MainApi";
import { BdMovie } from "./types";

export default async function fetchSavedMovies() {
  const response = await mainApi.getMovies();
  if (response.ok) {
    const dataSavedMovies = await response.json();
    return dataSavedMovies as BdMovie[];
  } else {
    return undefined;
  }
}