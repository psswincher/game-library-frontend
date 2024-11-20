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
  const { values, handleChange, setValues } = useForm(initialFormValues.signUp);

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
        <span
          className="modal__input_type_error email-error"
          id="email-input-error"
        ></span>
      </label>
      <label htmlFor="password" className={"modal__label"}>
        Password*
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
      <label htmlFor="confirmPassword" className={"modal__label"}>
        Confirm Password*
        <input
          name="confirmPassword"
          id="confirmPassword"
          className={"modal__input"}
          type="text"
          placeholder="Password"
          required
          value={values.confirmPassword}
          onChange={handleChange}
        />
        <span
          className="modal__input_type_error password-error"
          id="password-input-error"
        ></span>
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
        <span
          className="modal__input_type_error name-error"
          id="name-input-error"
        ></span>
      </label>
      <label htmlFor="avatar" className={"modal__label"}>
        Avatar URL
        <input
          name="avatar"
          id="avatar"
          className={"modal__input"}
          type="text"
          placeholder="Avatar URL"
          required
          value={values.avatar}
          onChange={handleChange}
        />
        <span
          className="modal__input_type_error avatar-input-error"
          id="avatar-input-error"
        ></span>
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
