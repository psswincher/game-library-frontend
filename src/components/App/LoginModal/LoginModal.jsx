import { useEffect, useState } from "react";
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
    clearForm,
  } = useForm(initialFormValues.signUp);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setValues(initialFormValues.signUp);
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values)
      .then(() => {
        clearForm();
        setErrorMessage("");
      })
      .catch((err) => {
        console.log("error passed back into modal");
        console.log(err);
        setErrorMessage("Login credentials invalid!");
      });
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
        <FormErrorMessage message={errorMessage} />
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
