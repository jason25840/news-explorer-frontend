import React from 'react';
import PopupWithForm from './PopupWithForm';
import '../styles/SuccessPopup.css';

const SuccessPopup = ({ isOpen, handleActiveModalClose, handleOpenLoginPopup }) => {
  return (
    <PopupWithForm
      title={null}
      isOpen={isOpen}
      handleActiveModalClose={handleActiveModalClose}
    >
      <div className="success-popup__message">
      <p className="success-popup__text">Registration successfully completed!</p>
        <button
          className="popup__option-btn"
          type="button"
          onClick={handleOpenLoginPopup}
        >
          <span className="popup__option-secondary">Sign in</span>
        </button>
      </div>
    </PopupWithForm>
  );
};

export default SuccessPopup;