import { useEffect } from "react"; 
import "../styles/PopupWithForm.css";
import PopupWithForm from "./PopupWithForm";
import { useHandleFormSubmit } from "../Hooks/useHandleFormSubmit";

const SignupPopup = ({
  isOpen,
  handleActiveModalClose,
  handleRegistration,
  handleOpenLoginPopup,
}) => {
      const { 
        values, 
        handleChange, 
        errors, 
        isValid, 
        resetForm, 
        onSubmit, 
        isLoading,
        isTyping
       } =
      useHandleFormSubmit(({ email, password, name }) =>
        handleRegistration(email, password, name)
      );
    
    useEffect(() => {
      if (isOpen) resetForm();
    }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      title="Sign up"
      isOpen={isOpen}
      handleActiveModalClose={handleActiveModalClose}
      onSubmit={onSubmit}
    >
      <label className="popup__label">
        Email
        <input
          name="email"
          className={`popup__input ${isTyping?.email ? 'popup__input--active' : ''} ${
            errors.email ? 'popup__input--invalid' : ''
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
        {errors.email && <p className="popup__input--invalid">{errors.email}</p>}
      </label>

      <label
        className="popup__label"
      >
        Password
        <input
          name="password"
          className={`popup__input ${isTyping?.password ? 'popup__input--active' : ''} ${
            errors.password ? 'popup__input--invalid' : ''
          }`}
          type="password"
          id="register-password"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
          minLength="8"
          maxLength="16"
          required
        />
        {errors.password && <p className="popup__input--invalid">{errors.password}</p>}
      </label>
      <label
        className="popup__label"
      >
        Username
        <input
          name="name"
          className={`popup__input ${isTyping?.name ? 'popup__input--active' : ''} ${
            errors.name ? 'popup__input--invalid' : ''
          }`}
          type="text"
          id="name"
          placeholder="Enter Your Username"
          value={values.name || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="16"
          required
        />
        {errors.name && <p className="popup__input--invalid">{errors.name}</p>}
      </label>

      <div className="popup__submit-btn-container">
        <button
          type="submit"
          className={`popup__submit-btn ${isValid ? "popup__submit-btn--active" : ""}`}
          disabled={!isValid || isLoading}
        >
           {isLoading ? "Signing up..." : "Sign up"}
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