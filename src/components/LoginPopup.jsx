import { useFormAndValidation } from "../Hooks/useFormAndValidation";
import "../styles/PopupWithForm.css";
import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";


const LoginPopup = ({
  isOpen,
  handleActiveModalClose,
  //handleLogin,
  handleOpenSignupPopup,
  //handleSubmit,
  //isLoading,
}) => {
  const {
    values,
    handleChange,
    errors,
    isValid,
    isTyping,
    resetForm, 
  } = useFormAndValidation();
    

    //add resetForm to above const.

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);
  //const handleFormSubmit = (e) => {
  //  e.preventDefault();
  //  if (isValid) {
   //   const makeRequest = () => handleLogin(values);
   //   handleSubmit(makeRequest);
   // }
  //};
  return (
    <PopupWithForm
      buttonText="Sign in"
      title="Sign in"
      isOpen={isOpen}
      handleActiveModalClose={handleActiveModalClose}
      //onSubmit={handleFormSubmit}
    >
      <label
        className="popup__label"
      >
        Email
        <input
          name="email"
          className={`popup__input ${isTyping.email ? 'popup__input_active' : ''} ${
            errors.email ? 'popup__input_invalid' : ''
          }`}
          type="email"
          id="email"
          placeholder="Enter email"
          value={values.email || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="40"
          required
        />
        {errors.email && <p className="popup__error">{errors.email}</p>}
      </label>

      <label
        className="popup__label"
      >
        Password
        <input
          name="password"
          className={`popup__input ${isTyping.password ? 'popup__input_active' : ''} ${
            errors.password ? 'popup__input_invalid' : ''
          }`}
          type="password"
          id="password"
          placeholder="Enter password"
          value={values.password || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="16"
          required
        />
        {errors.password && <p className="popup__error">{errors.password}</p>}
      </label>
      <div className="popup__submit-btn-container">
        <button
          type="submit"
          className={`popup__submit-btn ${isValid ? "popup__submit-btn_active" : ""}`}
          disabled={!isValid}
        >
          Sign in
        </button>
        <button
          type="button"
          className="popup__option-btn"
          onClick={handleOpenSignupPopup}
        >
        <span className="popup__option-or">Or </span>
        <span className="popup__option-secondary">Sign up</span>
        </button>
      </div>
    </ PopupWithForm>
  );
};

export default LoginPopup;