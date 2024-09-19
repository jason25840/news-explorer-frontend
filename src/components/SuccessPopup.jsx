import React from 'react';
import PopupWithForm from './PopupWithForm';

const SuccessPopup = ({ isOpen, handleActiveModalClose, handleOpenLoginPopup }) => {
  return (
    <PopupWithForm
      title="Success"
      isOpen={isOpen}
      handleActiveModalClose={handleActiveModalClose}
    >
      <div className="success-message">
        <p>Registration successfully completed!</p>
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