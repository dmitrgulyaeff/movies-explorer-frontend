import './Register.css';
import MiniHeader from '../MiniHeader/MiniHeader';
import Form from '../Form/Form';
import mainApi from '../../utils/MainApi';
import { UserRegistration, UserAuthorization } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthorizedContext, TokenContext } from '../../Contexts';

export default function Register() {
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  const { setAuthorized } = useContext(AuthorizedContext);
  return (
    <main className="register">
      <MiniHeader hello="Добро пожаловать!" />
      <Form
        onSubmit={async (stateForm) => {
          const userRegistration = stateForm as UserRegistration;
          try {
            await mainApi.signup(userRegistration);
          } catch (error) {
            throw new Error('Неправильно заполнена форма');
          }

          try {
            const { password, email } = userRegistration;
            const userAuthorization = { email, password } as UserAuthorization;
            const response = await mainApi.signin(userAuthorization);
            const data = await response.json();
            const { token } = data;
            setToken(token);
            setAuthorized(true);
            setTimeout(() => {
              navigate('/movies');
            }, 0);
          } catch (error) {
            throw new Error('Ошибка авторизации');
          }
        }}
      >
        <Form.Input
          stateKey="name"
          labelName="Имя"
          type="text"
          minLength={2}
          maxLength={30}
          required={true}
          placeholder='Ваше имя'
        />
        <Form.Input
          stateKey="email"
          labelName="E-mail"
          type="email"
          minLength={4}
          maxLength={30}
          required={true}
          placeholder='Ваша почта'
        />
        <Form.Input
          stateKey="password"
          labelName="Пароль"
          type="password"
          minLength={8}
          maxLength={30}
          required={true}
          placeholder='Ваш пароль'
        />
        <Form.ResponseError />
        <Form.SubmitBottom text="Зарегистрироваться" />
        <Form.RedirectOffer
          offerText="Уже зарегистрированы?"
          linkText="Войти"
          linkTo="/signin"
        />
      </Form>
    </main>
  );
}
