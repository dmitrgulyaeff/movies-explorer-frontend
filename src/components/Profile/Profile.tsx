import { useContext } from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../Contexts';
import ProfileForm from '../ProfileForm/ProfileForm';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';
import { UserUpdate, User } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { EMAIL_REGEX, MESSAGE_ERROR_EMAIL } from '../../utils/constants';
import launchConfetti from '../../utils/launchConfetti';

export default function Profile({ resetStates }: { resetStates: () => void }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigation = useNavigate();

  return (
    <main className="profile">
      <h1 className="profile__topic">
        {currentUser?.name ? 'Привет, ' + currentUser?.name + '!' : '...'}
      </h1>
      {currentUser.name ? (
        <ProfileForm
          onSubmit={async (stateProfileForm) => {
            try {
              if (
                !(
                  stateProfileForm.email === currentUser.email &&
                  stateProfileForm.name === currentUser.name
                )
              ) {
                const response = await mainApi.updateUser(
                  stateProfileForm as UserUpdate
                );
                const data = await response.json();
                setCurrentUser(data as User);
                launchConfetti();
              }
            } catch (error) {
              throw new Error('Неправильно заполнена форма');
            }
          }}
        >
          <ProfileForm.Input
            defaultState={currentUser.name}
            stateKey="name"
            labelName="Имя"
            type="text"
            minLength={2}
            maxLength={30}
            required={true}
            placeholder="Ваше имя"
          />
          <hr className="profile__form-hr" />
          <ProfileForm.Input
            defaultState={currentUser.email}
            stateKey="email"
            labelName="E-mail"
            type="email"
            minLength={4}
            maxLength={30}
            required={true}
            placeholder="Ваша почта"
            regexTest={{
              regex: EMAIL_REGEX,
              errorMessage: MESSAGE_ERROR_EMAIL,
            }}
          />
          <ProfileForm.ResponseError />
          <ProfileForm.SubmitBottom text="Сохранить" />
          <ProfileForm.EnableBottom text="Редактировать" />
        </ProfileForm>
      ) : (
        <Preloader />
      )}
      <button
        className="profile__button-exit"
        type="button"
        onClick={() => {
          resetStates();
          navigation('/');
        }}
      >
        Выйти из аккаунта
      </button>
    </main>
  );
}
