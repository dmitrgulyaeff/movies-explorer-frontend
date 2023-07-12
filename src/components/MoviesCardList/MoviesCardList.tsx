import './MoviesCardList.css'

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

import { MoviesContext, PathnameContext, CurrentUserContext } from '../../Contexts';
import { useContext } from 'react';

export default function MoviesCardList() {
  const { savedMovies, yaMovies } = useContext(MoviesContext);
  const { pathname } = useContext(PathnameContext);
  const { user } = useContext(CurrentUserContext)

  return (
    <section className='movies'>
      {pathname === '/movies' &&
        (yaMovies ? yaMovies.map((movie) => MoviesCard({movie, user, pathname})) : <Preloader />)}
      {pathname === '/saved-movies' &&
        (savedMovies ? savedMovies.map((movie) => MoviesCard({movie, user, pathname})) : <Preloader />)}
    </section>
  );
}
