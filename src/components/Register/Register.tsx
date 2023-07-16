import './Register.css';
import MiniHeader from '../MiniHeader/MiniHeader';
import Form from '../Form/Form';
import mainApi from '../../utils/MainApi';
import { UserRegistration, UserAuthorization } from '../../utils/types';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  return (
    <main className="register">
      <MiniHeader hello="Добро пожаловать!" />
      <Form
        onSubmit={async (stateForm) => {
          const userRegistration = stateForm as UserRegistration;
          const response = await mainApi.signup(userRegistration);
          if (response.ok) {
            const {password, email } = userRegistration;
            const userAuthorization = { email, password } as UserAuthorization;
            const response2 = await mainApi.signin(userAuthorization);
            const data2 = await response2.json();
            const { token }  = data2;
            await localStorage.setItem('token', token);
            navigate('/movies')
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
        <Form.RedirectOffer offerText='Уже зарегистрированы?' linkText='Войти' linkTo='/signin'/>
      </Form>
    </main>
  );
}
