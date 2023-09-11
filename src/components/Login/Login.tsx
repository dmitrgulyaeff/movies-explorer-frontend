import './Login.css';
import MiniHeader from '../MiniHeader/MiniHeader';
import Form from '../Form/Form';
import mainApi from '../../utils/MainApi';
import { AuthorizedContext, TokenContext } from '../../Contexts';
import { UserAuthorization } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

export default function Login() {
  const navigation = useNavigate();
  const { setToken } = useContext(TokenContext);
  const { setAuthorized } = useContext(AuthorizedContext);
  return (
    <main className="login">
      <MiniHeader hello="Рады видеть!" />
      <Form
        onSubmit={async (formState) => {
          const userAuthorization = formState as UserAuthorization;
          try {
            const response = await mainApi.signin(userAuthorization);
            console.log(response.ok);
            const data = await response.json();
            const { token } = data;
            setToken(token);
            setAuthorized(true);
            setTimeout(() => {
              navigation('/movies');
            }, 0);
          } catch (error) {
            throw new Error('Неправильно заполнена форма');
          }
        }}
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
