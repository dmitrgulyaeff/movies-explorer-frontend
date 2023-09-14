import React, { useState } from 'react';
import classNames from 'classnames';
import './Form.css';
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

interface FormProps {
  children: JSX.Element[];
  onSubmit: (formState: object) => void;
}

interface FormContextType {
  error: string;
  isValid: boolean;
  formState: object;
  setFormState: (state: object) => void;
  validState: object;
  setValidState: (state: object) => void;
}
const FormContext = React.createContext<FormContextType>({
  error: '',
  isValid: false,
  formState: {},
  setFormState: () => {},
  validState: {},
  setValidState: () => {},
});

export default function Form({ children, onSubmit }: FormProps) {
  const [error, setError] = useState('');
  const [formState, setFormState] = useState<object>({});
  const [validState, setValidState] = useState<object>({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const isValid = Object.values(validState).every((valid: boolean) => valid);
    setIsValid(isValid);
  }, [children.length, validState]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValid) {
      try {
        await onSubmit(formState);
      } catch (err) {
        if (err instanceof Error) {
          setError(String(err.message))
        }
      }
    }
  };

  return (
    <FormContext.Provider
      value={{ error, formState, setFormState, validState, setValidState, isValid }}
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
  autoComplete? : string;
}

Form.Input = function FormInput({
  stateKey,
  name,
  type,
  minLength,
  maxLength,
  required,
  autoComplete
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
        autoComplete={autoComplete}
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
Form.ResponseError  = function ResponseError() {
  const { error } = useContext(FormContext);
    return (<p className="form__response-error">{error}</p> )
};

interface RedirectOfferProps {
  offerText: string;
  linkText: string;
  linkTo: string;
}

Form.RedirectOffer  = function RedirectOffer({ offerText, linkText, linkTo }: RedirectOfferProps) {
  return (
    <div className="form__redirect-offers">
      <p className='form__redirect-offer form__redirect-offer_el_question'>{offerText}</p>
      <Link className='form__redirect-offer form__redirect-offer_el_link' to={linkTo}>{linkText}</Link>
    </div>
  );
};
