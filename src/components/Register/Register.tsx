import './Register.css';
import MiniHeader from '../MiniHeader/MiniHeader';
import Form from '../Form/Form';
import mainApi from '../../utils/MainApi';
import { UserRegistration, UserAuthorization } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TokenContext } from '../../Contexts';

export default function Register() {
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  return (
    <main className="register">
      <MiniHeader hello="Добро пожаловать!" />
      <Form
        onSubmit={async (stateForm) => {
          const userRegistration = stateForm as UserRegistration;
          const response = await mainApi.signup(userRegistration);
          const data = await response.json();
          if (response.ok) {
            const { password, email } = userRegistration;
            const userAuthorization = { email, password } as UserAuthorization;
            const response2 = await mainApi.signin(userAuthorization);
            const data2 = await response2.json();
            if (response2.ok) {
              const { token } = data2;
              await setToken(token);
              navigate('/movies');
            } else {
              const { message } = data2;
              if (message) {
                throw new Error(message);
              }
              throw new Error('Неправильно заполнена форма');
            }
          } else {
            const { message } = data;
            if (message) {
              throw new Error(message);
            }
            throw new Error('Неправильно заполнена форма');
          }
        }}
      >
        <Form.Input
          stateKey="name"
          name="Имя"
          type="username"
          minLength={2}
          maxLength={30}
          required={true}
        />
        <Form.Input
          stateKey="email"
          name="E-mail"
          type="email"
          minLength={4}
          maxLength={30}
          required={true}
        />
        <Form.Input
          stateKey="password"
          name="Пароль"
          type="password"
          minLength={8}
          maxLength={30}
          required={true}
        />
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
