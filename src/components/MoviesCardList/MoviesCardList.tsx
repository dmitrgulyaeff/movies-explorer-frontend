import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

import { MoviesContext } from '../../Contexts';
import { useContext } from 'react';

export default function MoviesCardList() {
  const { savedMovies, yaMovies, } = useContext(MoviesContext);

  return <section>{yaMovies ? yaMovies.map(MoviesCard) : <Preloader />}</section>;
}
