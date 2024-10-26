import { useState } from "react";
import { useFormAndValidation } from "./useFormAndValidation";

export const useHandleFormSubmit = (handleSubmit) => {
  const { values, handleChange, errors, isValid, resetForm, isTyping } = useFormAndValidation();
  const [isLoading, setIsLoading] = useState(false); 

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isValid) {
      setIsLoading(true); 
      try {
        await handleSubmit(values);
      } catch (error) {
        console.error("Form submission failed:", error);
      } finally {
        setIsLoading(false); 
      }
    }
  };

  return { values, handleChange, errors, isValid, resetForm, onSubmit, isLoading, isTyping };
};