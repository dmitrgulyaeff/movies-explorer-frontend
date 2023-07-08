import './Navigation.css';

import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

interface NavigationProps {}

export default function Navigation(props: NavigationProps) {
  const { pathname } = useLocation();

  const rootStylesClass = classNames('aside__nav-link', {'aside__nav-link_active' : pathname === '/'})
  const moviesStylesClass = classNames('aside__nav-link', {'aside__nav-link_active' : pathname === '/movies'})
  const savedMoviesStylesClass = classNames('aside__nav-link', {'aside__nav-link_active' : pathname === '/saved-movies'})

  return (
    <section className="popup popup_opened">
      <aside className="aside">
        <nav className="aside__nav">
          <ul className="aside__ul">
            <li className="aside__li">
              <Link className={rootStylesClass} to={'/'}>
                Главная
              </Link>
            </li>
            <li className="aside__li">
              <Link className={moviesStylesClass} to={'/movies'}>
                Фильмы
              </Link>
            </li>
            <li className="aside__li">
              <Link className={savedMoviesStylesClass} to={'/saved-movies'}>
                Сохранённые фильмы
              </Link>
            </li>
            <li className="aside__li aside__li_to_profile">
              <Link className="aside__nav-link aside__nav-link_to_profile" to={'/profile'} />
            </li>
          </ul>
        </nav>
      </aside>
    </section>
  );
}
