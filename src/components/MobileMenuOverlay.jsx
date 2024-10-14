import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/MobileMenuOverlay.css';
import logoutIcon from '../images/logout.svg';
import blackLogoutIcon from '../images/black-logout.svg';   

const MobileMenuOverlay = ({ handleClose, handleOpenLoginPopup, isLoggedIn, handleLogout, currentUser }) => {
    const location = useLocation();
    const isSavedNewsPage = location.pathname === '/saved-articles';
    
    return (
        <div className={`mobile-menu__overlay ${isSavedNewsPage ? 'mobile-menu__overlay--white' : ''}`}>
            <div className="mobile-menu__header">
                <h1 className="mobile-menu__logo">NewsExplorer</h1>
                <button className="mobile-menu__close-button" onClick={handleClose}>
                    &times;
                </button>
            </div>
            <div className="mobile-menu__content">
                <Link to="/" className="mobile-menu__link mobile-menu__link--home" onClick={handleClose}>Home</Link>
                {isLoggedIn && (
                    <div className="mobile-menu__second-row">
                        <Link to="/saved-articles" className="mobile-menu__link mobile-menu__link--saved-articles" onClick={handleClose}>Saved articles</Link>
                        <div className="mobile-menu__user-info">
                            <button 
                                className="mobile-menu__logout-button" 
                                onClick={() => {
                                    handleLogout();
                                    handleClose();
                                }}
                            >
                                <span className="mobile-menu__username">{currentUser?.userName || "guest"}</span>
                                <img src={isSavedNewsPage ? blackLogoutIcon : logoutIcon} alt="logout" className="mobile-menu__logout-icon" />
                            </button>
                        </div>
                    </div>
                )}
                {!isLoggedIn && (
                    <button 
                        className="mobile-menu__signin-button" 
                        onClick={() => {
                            handleOpenLoginPopup();
                            handleClose();
                        }}
                    >
                        Sign in
                    </button>
                )}
            </div>
        </div>
    );
};

export default MobileMenuOverlay;

