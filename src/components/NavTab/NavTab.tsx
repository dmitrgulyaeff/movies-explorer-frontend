import './NavTab.css';
import { useEffect, useContext } from 'react';
import { PathnameContext } from '../../Contexts';

import { NavLink } from 'react-router-dom';

export default function NavTab() {
  const { hash } = useContext(PathnameContext);

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <section className="navtab">
      <h1 className="navtab__topic">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <nav className="navtab__nav">
        <ul className="navtab__ul">
          <li className="navtab__li">
            <NavLink className="navtab__link" to={'#project'}>
              О проекте
            </NavLink>
          </li>
          <li className="navtab__li">
            <NavLink className="navtab__link" to={'#technologies'}>
              Технологии
            </NavLink>
          </li>
          <li className="navtab__li">
            <NavLink className="navtab__link" to={'#student'}>
              Студент
            </NavLink>
          </li>
        </ul>
      </nav>
    </section>
  );
}
