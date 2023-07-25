import './Login.css';
import MiniHeader from '../MiniHeader/MiniHeader';
import Form from '../Form/Form';
import mainApi from '../../utils/MainApi';
import { TokenContext } from '../../Contexts';
import { UserAuthorization } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

export default function Login() {
  const navigation = useNavigate();
  const { setToken } = useContext(TokenContext)
  return (
    <main className="login">
      <MiniHeader hello="Рады видеть!" />
      <Form
        onSubmit={async (formState) => {
          const userAuthorization = formState as UserAuthorization;
          const response = await mainApi.signin(userAuthorization);
          const data = await response.json();
          if (response.ok) {
            const { token } = data;
            await setToken(token);
            navigation('/movies')
          } else {
            const { message } = data;
            if (message) {
              throw new Error(message);
            }
            throw new Error('Неправильно заполнена форма');
          }
        }
      }
      >
        <Form.Input
          stateKey="email"
          name="E-mail"
          type="email"
          autoComplete="username"
          minLength={4}
          maxLength={30}
          required={true}
        />
        <Form.Input
          stateKey="password"
          name="Пароль"
          type="password"
          autoComplete="current-password"
          minLength={8}
          maxLength={30}
          required={true}
        />
        <Form.ResponseError />
        <Form.SubmitBottom text="Войти" />
        <Form.RedirectOffer
          offerText="Ещё не зарегистрированы?"
          linkText="Регистрация"
          linkTo="/signup"
        />
      </Form>
    </main>
  );
}
