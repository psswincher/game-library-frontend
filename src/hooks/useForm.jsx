import { useState } from "react";

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [errorMessages, setErrorMessages] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const handleChange = (event) => {
    const { value, name } = event.target;

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    validationHandler(name, value);
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const setError = (field, error) => {
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  const clearErrors = () => {
    setErrorMessages({});
  };
  const clearForm = () => {
    clearErrors();
    setTouchedFields({});
  };

  //Keeping in case my cute affirmations aren't a direction I want to go in.
  // const clearError = (field) => {
  //   setErrorMessages((prevErrors) => ({
  //     ...prevErrors,
  //     [field]: "",
  //   }));
  // };

  const validationHandler = (field, value) => {
    const validationSchema = validationSchemas[field] || undefined;
    let error = "";
    if (validationSchema) {
      Object.keys(validationSchema).forEach((validator) => {
        if (!checkValidation[validator](value, validationSchema[validator])) {
          error = validationSchemas[field][validator].error;
        }
      });
    }
    if (error) {
      setError(field, error);
    } else {
      setError(field, affirmations[field]);
    }
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const affirmations = {
    email: "Nice email address!",
    password: "Looks good.",
    confirmPassword: "Excellent.",
    url: "Thank you!",
    name: "Cool name!",
  };

  const validationSchemas = {
    email: {
      minLength: { value: 4, error: "Email is not long enough." },
      maxLength: { value: 30, error: "Email is too long." },
      regex: { value: emailPattern, error: "Not a valid email address." },
      required: { value: true, error: "Please enter an email address." },
    },
    password: {
      minLength: { value: 8, error: "Password not long enough." },
      required: { value: true, error: "Please enter a password." },
    },
    confirmPassword: {
      minLength: { value: 8, error: "Password not long enough." },
      matchField: { value: "password", error: "Passwords ought to match." },
      required: { value: true, error: "Please enter a password." },
    },
  };

  const checkValidation = {
    matchField: (value, validationSchema) => {
      return value === values[validationSchema.value];
    },
    minLength: (value, validationSchema) => {
      return value.length >= validationSchema.value || value.length === 0;
    },
    maxLength: (value, validationSchema) => {
      return value.length <= validationSchema.value;
    },
    regex: (value, validationSchema) => {
      return validationSchema.value.test(value);
    },
    required: (value, validationSchema) => {
      return value.length !== 0;
    },
  };

  return {
    values,
    handleChange,
    handleBlur,
    setValues,
    errorMessages,
    touchedFields,
    clearForm,
  };
}
