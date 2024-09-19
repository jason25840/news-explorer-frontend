import { useState, useCallback } from 'react';

function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [isTyping, setIsTyping] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsTyping({ ...isTyping, [name]: value !== "" });
    
    // Update input values
    setValues({ ...values, [name]: value });

    // Custom error messages
    if (name === "email") {
      if (value.length < 2 || value.length > 40) {
        setErrors({ ...errors, email: "Invalid email address" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    } else if (name === "password") {
      if (value.length < 2 || value.length > 16) {
        setErrors({ ...errors, password: "Invalid password. Must be between 2 and 16 characters" });
      } else {
        setErrors({ ...errors, password: "" });
      }
    } else if (name === "userName") {
      if (value.length < 2 || value.length > 16) {
        setErrors({ ...errors, userName: "Invalid username. Must be between 2 and 16 characters" });
      } else {
        setErrors({ ...errors, userName: "" });
      }
    } else {
      setErrors({ ...errors, [name]: e.target.validationMessage });
    }

    // Update form validity
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
    setIsTyping({});
  }, [setValues, setErrors, setIsValid, setIsTyping]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid, isTyping };
}

export { useFormAndValidation }; 
