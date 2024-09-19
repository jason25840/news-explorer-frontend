import "../styles/PopupWithForm.css";

import React, { useRef } from "react";
import close from "../images/close.svg";

function PopupWithForm({
  children,
  isOpen,
  handleActiveModalClose,
  onSubmit,
  title,
}) {
  const modalRef = useRef();

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleActiveModalClose();
    }
  };

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      aria-label="close"
      onPointerDown={handleClickOutside}
    >
      <div className="popup__content" ref={modalRef}>
        <h2 className="popup__title">{title}</h2>
        <button
          onClick={handleActiveModalClose}
          type="button"
          className="popup__close"
        >
          <img src={close} alt="close" />
        </button>
        <form className="popup__form"> {/*onSubmit={onSubmit}>*/}
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;