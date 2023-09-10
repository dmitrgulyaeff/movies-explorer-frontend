import { NavLink } from 'react-router-dom';
import { AuthorizedContext, PathnameContext } from '../../Contexts';
import { useContext } from 'react';
import './Footer.css';

export default function Footer() {
  const { isAuthorized } = useContext(AuthorizedContext);
  const { pathname } = useContext(PathnameContext);
  const allowedPaths: string[] = ['/', '/movies', '/saved-movies'];
  const protectedPaths = ['/movies', '/saved-movies', '/profile'];

  if (!allowedPaths.includes(pathname)) {
    return null;
  }

  if (protectedPaths.includes(pathname) && !isAuthorized) {
    return null;
  }

  return (
    <footer className="footer">
      <h3 className="footer__topic">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <p className="footer__copyright">{'© ' + new Date().getFullYear()}</p>
      <nav className="footer__nav">
        <ul className="footer__ul">
          <li>
            <NavLink className="footer__link" to="https://practicum.yandex.ru/">
              Яндекс.Практикум
            </NavLink>
          </li>
          <li>
            <NavLink className="footer__link" to="https://github.com/">
              Github
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
