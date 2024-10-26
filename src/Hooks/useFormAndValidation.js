import { useState, useCallback } from 'react';

function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isTyping, setIsTyping] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsTyping((prev) => ({ ...prev, [name]: value !== '' }));

    setValues((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prev) => ({
        ...prev,
        email: emailRegex.test(value) ? "" : "Invalid email format",
      }));
    } else if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: value.length >= 8 ? "" : "Password must be at least 8 characters long",
      }));
    } else if (name === "name") {
      setErrors((prev) => ({
        ...prev,
        name: value.length >= 2 && value.length <= 30
          ? ""
          : "Name must be between 2 and 30 characters long",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: e.target.validationMessage,
      }));
    }

    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setIsTyping({});
    },
    []
  );

  return { values, handleChange, errors, isValid, resetForm, isTyping };
}

export { useFormAndValidation };