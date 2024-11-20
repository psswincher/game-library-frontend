import { useEffect } from "react";
import { useForm } from "../../../hooks/useForm";

import { initialFormValues } from "../../../utils/constants";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onLogin, altButtonText, handleAltButton }) => {
  const { values, handleChange, setValues } = useForm(initialFormValues.signUp);

  useEffect(() => {
    setValues(initialFormValues.signUp);
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  return (
    <ModalWithForm
      submitButtonText="Login User"
      isOpen={isOpen}
      handleSubmit={handleSubmit}
      altButtonText={altButtonText}
      handleAltButton={handleAltButton}
    >
      <div className={"modal__content"}>
        <label htmlFor="email" className={"modal__label"}>
          Email
          <input
            name="email"
            id="email"
            className={"modal__input"}
            type="text"
            placeholder="Email"
            required
            value={values.email}
            onChange={handleChange}
          />
          <span
            className="modal__input_type_error email-error"
            id="email-input-error"
          ></span>
        </label>
        <label htmlFor="password" className={"modal__label"}>
          Password
          <input
            name="password"
            id="password"
            className={"modal__input"}
            type="text"
            placeholder="Password"
            required
            value={values.password}
            onChange={handleChange}
          />
          <span
            className="modal__input_type_error password-error"
            id="password-input-error"
          ></span>
        </label>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
