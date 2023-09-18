import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const navigation = useNavigate();

  return (
    <section className="not-found-page">
      <h1 className="not-found-page__topic-code">404</h1>
      <p className="not-found-page__description-code">Страница не найдена</p>
      <button className="not-found-page__back-button" onClick={() => {
        navigation(-1)
      }}>Назад</button>
    </section>
  );
}
