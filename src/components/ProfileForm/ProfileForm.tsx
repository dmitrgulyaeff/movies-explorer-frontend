import React, { useState } from 'react';
import classNames from 'classnames';
import { useEffect, useContext } from 'react';
import { UserUpdate } from '../../utils/types';

interface ProfileFormProps {
  children: JSX.Element[];
  onSubmit: (formState: UserUpdate) => void;
}

interface ProfileFormContextType {
  error: string;
  isValid: boolean;
  setProfileFormState: (state: object) => void;
  validState: object;
  setValidState: (state: object) => void;
  isActive: boolean;
  setIsActive: (x: boolean) => void;
}
const ProfileFormContext = React.createContext<ProfileFormContextType>({
  error: '',
  isValid: false,
  setProfileFormState: () => {},
  validState: {},
  setValidState: () => {},
  isActive: false,
  setIsActive: () => {},
});

export default function ProfileForm({ children, onSubmit }: ProfileFormProps) {
  const [error, setError] = useState('');
  const [formState, setProfileFormState] = useState<object>({});
  const [validState, setValidState] = useState<object>({});
  const [isValid, setIsValid] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const isValid = Object.values(validState).every((valid: boolean) => valid);
    setIsValid(isValid);
  }, [children.length, validState]);

  useEffect(() => {
    console.log(formState);
  }, [formState]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsActive(false);
    if (isValid) {
      try {
        await onSubmit(formState as UserUpdate);
      } catch (err) {
        if (err instanceof Error) {
          setError(String(err.message));
        }
      }
    }
  };

  return (
    <ProfileFormContext.Provider
      value={{
        isActive,
        setIsActive,
        error,
        setProfileFormState,
        validState,
        setValidState,
        isValid,
      }}
    >
      <form className="profile__form" onSubmit={handleSubmit}>
        {children}
      </form>
    </ProfileFormContext.Provider>
  );
}

interface ProfileFormInputProps {
  stateKey: string;
  labelName: string;
  type: string;
  minLength: number;
  maxLength: number;
  required: boolean;
  autoComplete?: string;
  defaultState: string;
  placeholder: string;
  regexTest?: { regex: RegExp; errorMessage: string };
}

ProfileForm.Input = function ProfileFormInput({
  stateKey,
  labelName,
  type,
  minLength,
  maxLength,
  required,
  autoComplete,
  defaultState,
  placeholder,
  regexTest
}: ProfileFormInputProps) {
  const { isActive, setProfileFormState, validState, setValidState } =
    React.useContext(ProfileFormContext);
  const [error, setError] = useState<string>('');
  const [value, setValue] = useState(defaultState);

  useEffect(() => {
    if (setProfileFormState && stateKey && value) {
      setProfileFormState((prevState: {}) => ({
        ...prevState,
        [stateKey]: value,
      }));
    }
  }, [setProfileFormState, stateKey, value]);

  const inputStylesClass = classNames('profile__form-input-input', {
    'profile__form-input-input__failed': error,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const input = event.target;
    const value = input.value;
    let error = input.validationMessage;
    if (regexTest && !error) {
      const { regex, errorMessage } = regexTest;
      if (!regex.test(value)) {
        error = errorMessage;
      }
    }
    setValue(value);
    setError(error);
    setValidState({ ...validState, [stateKey]: !error });
  };

  return (
    <div className="profile__form-input">
      <p className="profile__form-input-name">{labelName}</p>
      <input
        value={value}
        className={inputStylesClass}
        type={type}
        onChange={handleChange}
        onInvalid={handleChange}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
        disabled={!isActive}
        placeholder={placeholder}
        name={stateKey}
      />
      <p className="profile__form-input-error">{error}</p>
    </div>
  );
};

interface FormSubmitBottomProps {
  text: string;
}

ProfileForm.SubmitBottom = function SubmitBottom({
  text,
}: FormSubmitBottomProps) {
  const { isActive, isValid } = useContext(ProfileFormContext);
  return (
    <>
      {isActive && (
        <button
          className="profile__form-btn"
          type="submit"
          disabled={!isValid}
        >
          {text}
        </button>
      )}
    </>
  );
};

ProfileForm.EnableBottom = function EnableBottom({
  text,
}: FormSubmitBottomProps) {
  const { isActive, setIsActive } = useContext(ProfileFormContext);
  return (
    <>
      {!isActive && (
        <button
          className="profile__form-btn"
          type="button"
          onClick={() => {
            setIsActive(true);
          }}
        >
          {text}
        </button>
      )}
    </>
  );
};

ProfileForm.ResponseError = function ResponseError() {
  const { error } = useContext(ProfileFormContext);
  return <p className="profile__form-response-error">{error}</p>;
};
