import './Header.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Burger from '../Burger/Burger';
import { AuthorizedContext, PathnameContext } from '../../Contexts';
import { useContext } from 'react';

export default function Header() {
  const { isAuthorized } = useContext(AuthorizedContext);

  const { pathname } = useContext(PathnameContext);
  const allowedPaths: string[] = ['/', '/movies', '/saved-movies', '/profile'];
  const protectedPaths = ['/movies', '/saved-movies', '/profile'];

  if (!allowedPaths.includes(pathname)) {
    return null;
  }

  if (protectedPaths.includes(pathname) && !isAuthorized) {
    return null;
  }

  const savedFilmsStylesClass = classNames(
    'navbar__link navbar__link_to_movies',
    {
      navbar__link_to_movies_active: pathname === '/saved-movies',
    }
  );

  const filmsStylesClass = classNames('navbar__link navbar__link_to_movies', {
    navbar__link_to_movies_active: pathname === '/movies',
  });

  return (
    <header
      className={classNames('header', { header_authorized: isAuthorized })}
    >
      <nav className="navbar">
        <ul className="navbar__ul">
          <li className="navbar__li navbar__li_to_root">
            <Link className="navbar__link navbar__link_to_root" to="/"></Link>
          </li>
          {isAuthorized ? (
            <>
              <li className="navbar__li navbar__li_to_movies">
                <Link className={filmsStylesClass} to="/movies">
                  Фильмы
                </Link>
              </li>
              <li className="navbar__li navbar__li_to_saved-movies">
                <Link className={savedFilmsStylesClass} to="/saved-movies">
                  Сохранённые фильмы
                </Link>
              </li>
              <li className="navbar__li navbar__li_to_profile">
                <Link
                  className="navbar__link navbar__link_to_profile"
                  to="/profile"
                >
                  Аккаунт
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="navbar__li">
                <Link
                  className="navbar__link navbar__link_to_signup"
                  to="/signup"
                >
                  Регистрация
                </Link>
              </li>
              <li className="navbar__li">
                <Link
                  className="navbar__link navbar__link_to_signin"
                  to="/signin"
                >
                  Войти
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      {isAuthorized && <Burger />}
    </header>
  );
}
