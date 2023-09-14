import './AboutMe.css';

import { NavLink } from 'react-router-dom';
import avatar from '../../images/student.png';

export default function AboutMe() {
  return (
    <section id="student" className="student">
      <h2 className="student__topic">Студент</h2>
      <div className="student__resume">
        <div className="student__resume-wrappper">
          <h3 className="student__resume-name">Виталий</h3>
          <p className="student__resume-description">
            Фронтенд-разработчик, 30 лет
          </p>
          <p className="student__resume-story">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <NavLink
            className="student__github-link"
            to={'https://github.com/dmitrgulyaeff'}
          >
            Github
          </NavLink>
        </div>
        <img
          className="student__resume-avatar"
          src={avatar}
          alt="аватар студента"
        />
      </div>
    </section>
  );
}
