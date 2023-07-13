import React, { useState } from 'react';
import classNames from 'classnames';
import './Form.css';
import { useEffect, useContext } from 'react';

interface FormProps {
  children: JSX.Element[];
  onSubmit: (formState: object) => void;
}

interface FormContextType {
  isValid: boolean;
  formState: object;
  setFormState: (state: object) => void;
  validState: object;
  setValidState: (state: object) => void;
}
const FormContext = React.createContext<FormContextType>({
  isValid: false,
  formState: {},
  setFormState: () => {},
  validState: {},
  setValidState: () => {},
});

export default function Form({ children, onSubmit }: FormProps) {
  const [formState, setFormState] = useState<object>({});
  const [validState, setValidState] = useState<object>({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const isValid = Object.values(validState).every((valid: boolean) => valid);
    setIsValid(isValid);
  }, [children.length, validState]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValid) {
      onSubmit(formState);
    }
  };

  return (
    <FormContext.Provider
      value={{ formState, setFormState, validState, setValidState, isValid }}
    >
      <form className="form" onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

interface FormInputProps {
  stateKey: string;
  name: string;
  type: string;
  minLength: number;
  maxLength: number;
  required: boolean;
}

Form.Input = function FormInput({
  stateKey,
  name,
  type,
  minLength,
  maxLength,
  required,
}: FormInputProps) {
  const { formState, setFormState, validState, setValidState } =
    React.useContext(FormContext);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setValidState((prevState: object) => ({ ...prevState, [stateKey]: false }));
  }, [setValidState, stateKey]);

  const inputStylesClass = classNames('form__input-input', {
    'form__input-input__failed': error,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const input = event.target;
    const value = input.value;
    setError(input.validationMessage);
    setFormState({ ...formState, [stateKey]: value });
    setValidState({ ...validState, [stateKey]: !input.validationMessage });
  };

  return (
    <div className="form__input">
      <p className="form__input-name">{name}</p>
      <input
        className={inputStylesClass}
        type={type}
        onChange={handleChange}
        onInvalid={handleChange}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
      />
      <p className="form__input-error">{error}</p>
    </div>
  );
};

interface FormSubmitBottomProps {
  text: string;
}
Form.SubmitBottom = function SubmitBottom({ text }: FormSubmitBottomProps) {
  const { isValid } = useContext(FormContext);
  return (
    <button className="form__btn-submit" type="submit" disabled={!isValid}>
      {text}
    </button>
  );
};
