import './Header.css';

import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

interface HeaderProps {
  isAuthorized: boolean;
}

export default function Header({ isAuthorized }: HeaderProps) {
  const { pathname } = useLocation();

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
    <header className="header">
      <nav className='navbar'>
        <ul className="navbar__ul">
          <li className="navbar__li navbar__li_to_root">
            <Link className="navbar__link navbar__link_to_root" to="/"></Link>
          </li>
          {isAuthorized ? (
            <>
              <li className="navbar__li">
                <Link className={filmsStylesClass} to="/movies">
                  Фильмы
                </Link>
              </li>
              <li className="navbar__li">
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
    </header>
  );
}
