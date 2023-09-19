import './Login.css';
import MiniHeader from '../MiniHeader/MiniHeader';
import Form from '../Form/Form';
import mainApi from '../../utils/MainApi';
import { AuthorizedContext, TokenContext } from '../../Contexts';
import { UserAuthorization } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { EMAIL_REGEX, MESSAGE_ERROR_EMAIL } from '../../utils/constants';
import launchConfetti from '../../utils/launchConfetti';

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
              launchConfetti()
            }, 0);
          } catch (error) {
            throw new Error('Неправильно заполнена форма');
          }
        }}
      >
        <Form.Input
          stateKey="email"
          labelName="E-mail"
          type="email"
          autoComplete="username"
          minLength={4}
          maxLength={30}
          required={true}
          placeholder='Ваша почта'
          regexTest={{regex: EMAIL_REGEX, errorMessage: MESSAGE_ERROR_EMAIL}}
        />
        <Form.Input
          stateKey="password"
          labelName="Пароль"
          type="password"
          autoComplete="current-password"
          minLength={8}
          maxLength={30}
          required={true}
          placeholder='Ваш пароль'
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
