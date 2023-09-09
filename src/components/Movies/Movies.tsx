import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import useSavedMovies from '../../hooks/useSavedDataMovies';
import useNormalizedYaMovies from '../../hooks/useNormalizedYaMovies';

export default function Movies() {
  useSavedMovies();
  useNormalizedYaMovies();

  return (
    <main className="main__movies">
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}
