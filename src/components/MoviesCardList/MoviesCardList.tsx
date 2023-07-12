import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

import { MoviesContext, PathnameContext } from '../../Contexts';
import { useContext } from 'react';

export default function MoviesCardList() {
  const { savedMovies, yaMovies } = useContext(MoviesContext);
  const { pathname } = useContext(PathnameContext);

  return (
    <section>
      {pathname === '/movies' &&
        (yaMovies ? yaMovies.map(MoviesCard) : <Preloader />)}
      {pathname === '/saved-movies' &&
        (savedMovies ? savedMovies.map(MoviesCard) : <Preloader />)}
    </section>
  );
}
