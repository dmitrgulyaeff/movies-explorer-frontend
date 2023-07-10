import './Techs.css';

import { NavLink } from 'react-router-dom';

export default function Techs() {
  return (
    <section id="technologies" className="techs">
      <h3 className="techs__topic">Технологии</h3>
      <div className="techs__line"></div>
      <div className="techs__description">
        <h2 className="techs__description-topic">7 технологий</h2>
        <p className="techs__description-text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <nav className="techs__nav">
          <ul className="techs__ul">
            <li>
              <NavLink
                className="techs__link"
                to={'https://html.spec.whatwg.org/'}
              >
                HTML
              </NavLink>
            </li>
            <li>
              <NavLink
                className="techs__link"
                to={'https://www.w3.org/TR/CSS/#css-glossary'}
              >
                CSS
              </NavLink>
            </li>
            <li>
              <NavLink
                className="techs__link"
                to={'https://developer.mozilla.org/en-US/docs/Web/JavaScript'}
              >
                JS
              </NavLink>
            </li>
            <li>
              <NavLink
                className="techs__link"
                to={'https://legacy.reactjs.org/'}
              >
                React
              </NavLink>
            </li>
            <li>
              <NavLink
                className="techs__link"
                to={
                  'https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F'
                }
              >
                Git
              </NavLink>
            </li>
            <li>
              <NavLink className="techs__link" to={'https://expressjs.com/'}>
                Express.js
              </NavLink>
            </li>
            <li>
              <NavLink className="techs__link" to={'https://www.mongodb.com/'}>
                mongoDB
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
