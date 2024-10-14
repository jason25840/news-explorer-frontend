import { useEffect } from "react"; 
import { useFormAndValidation } from "../Hooks/useFormAndValidation";

import "../styles/PopupWithForm.css";
import PopupWithForm from "./PopupWithForm";

const SignupPopup = ({
  isOpen,
  handleActiveModalClose,
  handleRegistration,
  handleOpenLoginPopup,
  handleOpenSuccessPopup,
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

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
    handleRegistration(values)
      .then(() => {
      handleOpenSuccessPopup();
  })
  .catch((error) => {
    console.log("Registration failed:", error);
  });
}
};

  return (
    <PopupWithForm
      title="Sign up"
      isOpen={isOpen}
      handleActiveModalClose={handleActiveModalClose}
      onSubmit={handleFormSubmit}
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
          id="signup-email"
          placeholder="Enter email"
          value={values.email || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="40"
          required
        />
        {errors.email && <p className="popup__input_invalid">{errors.email}</p>}
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
          id="register-password"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="16"
          required
        />
        {errors.password && <p className="popup__input_invalid">{errors.password}</p>}
      </label>
      <label
        className="popup__label"
      >
        Username
        <input
          name="userName"
          className={`popup__input ${isTyping.userName ? 'popup__input_active' : ''} ${
            errors.userName ? 'popup__input_invalid' : ''
          }`}
          type="text"
          id="userName"
          placeholder="Enter Your Username"
          value={values.userName || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="16"
          required
        />
        {errors.userName && <p className="popup__input_invalid">{errors.userName}</p>}
      </label>

      <div className="popup__submit-btn-container">
        <button
          type="submit"
          className={`popup__submit-btn ${isValid ? "popup__submit-btn_active" : ""}`}
          disabled={!isValid}
          onClick={handleFormSubmit}
        >
            Sign up
        </button>
        <button
          className="popup__option-btn"
          type="button"
          onClick={handleOpenLoginPopup}
        >
          <span className="popup__option-or">Or </span>
          <span className="popup__option-secondary">Sign in</span>
        </button>
      </div>
    </PopupWithForm>
  );
};

export default SignupPopup;