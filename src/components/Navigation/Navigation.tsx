import './Navigation.css';
import {
  PopupContext,
  PathnameContext,
  AuthorizedContext,
} from '../../Contexts';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface NavigationProps {}

export default function Navigation(props: NavigationProps) {
  const { isPopupOpened, setPopupOpened } = useContext(PopupContext);
  const { isAuthorized } = useContext(AuthorizedContext);
  const { pathname } = useContext(PathnameContext);

  const rootStylesClass = classNames('aside__nav-link', {
    'aside__nav-link_active': pathname === '/',
  });
  const moviesStylesClass = classNames('aside__nav-link', {
    'aside__nav-link_active': pathname === '/movies',
  });
  const savedMoviesStylesClass = classNames('aside__nav-link', {
    'aside__nav-link_active': pathname === '/saved-movies',
  });

  const closeHandler = () => {
    setPopupOpened(false);
  };
  return (
    <>
      {' '}
      {isAuthorized && (
        <section
          className={classNames('popup', { popup_opened: isPopupOpened })}
        >
          <aside
            className={classNames('aside', { aside_opened: isPopupOpened })}
          >
            <nav className="aside__nav">
              <ul className="aside__ul">
                <li className="aside__li">
                  <Link
                    onClick={closeHandler}
                    className={rootStylesClass}
                    to={'/'}
                  >
                    Главная
                  </Link>
                </li>
                <li className="aside__li">
                  <Link
                    onClick={closeHandler}
                    className={moviesStylesClass}
                    to={'/movies'}
                  >
                    Фильмы
                  </Link>
                </li>
                <li className="aside__li">
                  <Link
                    onClick={closeHandler}
                    className={savedMoviesStylesClass}
                    to={'/saved-movies'}
                  >
                    Сохранённые фильмы
                  </Link>
                </li>
                <li className="aside__li aside__li_to_profile">
                  <Link
                    onClick={closeHandler}
                    className="aside__nav-link aside__nav-link_to_profile"
                    to={'/profile'}
                  />
                </li>
              </ul>
            </nav>
          </aside>
        </section>
      )}
    </>
  );
}
