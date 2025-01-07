import { useEffect } from "react";
import { useForm } from "../../../hooks/useForm";
import "./RegisterModal.css";
import { initialFormValues } from "../../../utils/constants";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  isOpen,
  onSignUp,
  altButtonText,
  handleAltButton,
}) => {
  const { values, handleChange, setValues, errorMessages } = useForm(
    initialFormValues.signUp
  );

  useEffect(() => {
    setValues(initialFormValues.signUp);
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(values);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      submitButtonText="Next"
      submitButtonLoadingText="Registering user..."
      handleSubmit={handleSubmit}
      altButtonText={altButtonText}
      handleAltButton={handleAltButton}
      isOpen={isOpen}
    >
      <label htmlFor="email" className={"modal__label"}>
        Email*
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
        <div className="modal__error">
          {errorMessages["email"] && errorMessages["email"]}
        </div>
      </label>
      <label htmlFor="password" className={"modal__label"}>
        Password*
        <input
          name="password"
          id="password"
          className={"modal__input"}
          type="password"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
        <div className="modal__error">
          {errorMessages["password"] && errorMessages["password"]}
        </div>
      </label>
      <label htmlFor="confirmPassword" className={"modal__label"}>
        Confirm Password*
        <input
          name="confirmPassword"
          id="confirmPassword"
          className={"modal__input"}
          type="password"
          placeholder="Password"
          required
          value={values.confirmPassword}
          onChange={handleChange}
        />
        <div className="modal__error">
          {errorMessages["confirmPassword"] && errorMessages["confirmPassword"]}
        </div>
      </label>
      <label htmlFor="name" className={"modal__label"}>
        Name
        <input
          name="name"
          id="name"
          className={"modal__input"}
          type="text"
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
        />
        <div className="modal__error">
          {errorMessages["name"] && errorMessages["name"]}
        </div>
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
