import { useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "../../../hooks/useForm";
import style from "./LoginModal.module.css";

import { initialFormValues } from "../../../utils/constants";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";

const LoginModal = ({ isOpen, onLogin, altButtonText, handleAltButton }) => {
  const {
    values,
    handleChange,
    setValues,
    errorMessages,
    handleBlur,
    touchedFields,
    errorVariants,
  } = useForm(initialFormValues.signUp);

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
            onBlur={handleBlur}
          />
          <div className={style["modal__error-placeholder"]}>
            {touchedFields["email"] && errorMessages["email"] && (
              <FormErrorMessage message={errorMessages["email"]} />
            )}
          </div>
        </label>
        <label htmlFor="password" className={"modal__label"}>
          Password
          <input
            name="password"
            id="password"
            className={"modal__input"}
            type="password"
            placeholder="Password"
            required
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className={style["modal__error-placeholder"]}>
            {touchedFields["password"] && errorMessages["password"] && (
              <FormErrorMessage message={errorMessages["password"]} />
            )}
          </div>
        </label>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
