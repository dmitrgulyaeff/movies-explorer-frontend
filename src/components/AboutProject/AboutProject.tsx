import './AboutProject.css';

export default function AboutProject() {
  return(
    <section id='project' className="project">
      <h2 className="project__topic">О проекте</h2>
      <div className="project__line"/>
      <ul className="project__descriptions">
        <li>
          <article className="project__description">
            <h3 className="project__description-topic">Дипломный проект включал 5 этапов</h3>
            <p className="project__description-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </article>
        </li>
        <li>
          <article className="project__description">
            <h3 className="project__description-topic">На выполнение диплома ушло 5 недель</h3>
            <p className="project__description-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </article>
        </li>
      </ul>
      <div className="project__timeline">
        <div className="project__timeline-interval project__timeline-interval_position_first">1 неделя</div>
        <div className="project__timeline-interval project__timeline-interval_position_second">4 недели</div>
        <p className="project__timeline-interval-description project__timeline-interval-description_position_first">Back-end</p>
        <p className="project__timeline-interval-description project__timeline-interval-description_position_second">Front-end</p>
      </div>
    </section>

  )
};
