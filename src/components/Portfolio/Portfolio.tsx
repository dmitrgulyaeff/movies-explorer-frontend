import './Portfolio.css';
import { NavLink } from 'react-router-dom';
import { ReactComponent as ArrowLink } from '../../images/icons/arrow_link.svg';

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__topic">Портфолио</h3>
      <nav className="portfolio__nav">
        <ul className="portfolio__ul">
          <li>
            <NavLink
              className="portfolio__link"
              to="https://github.com/dmitrgulyaeff/russian-travel"
            >
              Статичный сайт
              <ArrowLink className="portfolio__link-arrow" />
            </NavLink>
          </li>
          <li>
            <NavLink
              className="portfolio__link"
              to="https://github.com/dmitrgulyaeff/react-mesto-auth"
            >
              Адаптивный сайт
              <ArrowLink className="portfolio__link-arrow" />
            </NavLink>
          </li>
          <li>
            <NavLink
              className="portfolio__link portfolio__link_position_last "
              to="https://github.com/dmitrgulyaeff/shri-react-2023"
            >
              Одностраничное приложение
              <ArrowLink className="portfolio__link-arrow" />
            </NavLink>
          </li>
        </ul>
      </nav>
    </section>
  );
}
