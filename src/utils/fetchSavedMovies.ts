import mainApi from "./MainApi";
import { BdMovie } from "./types";

export default async function fetchSavedMovies() {
  try {
    const response = await mainApi.getMovies();
    const dataSavedMovies = await response.json();
    return dataSavedMovies as BdMovie[];
  } catch (error) {
    return undefined;
  }
}