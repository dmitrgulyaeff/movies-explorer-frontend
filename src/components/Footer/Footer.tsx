import { NavLink } from 'react-router-dom';
import { PathnameContext } from '../../Contexts';
import { useContext } from 'react';
import './Footer.css';

export default function Footer() {
  const { pathname } = useContext(PathnameContext);
  const allowedPaths: string[] = ['/', '/movies', '/saved-movies'];

  if (!allowedPaths.includes(pathname)) {
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
  )
}
