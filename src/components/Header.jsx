import React, { useState, useContext } from 'react';
import '../styles/Header.css';
import Navigation from './Navigation'; 
import MobileMenuOverlay from './MobileMenuOverlay';
import { useLocation } from 'react-router-dom';
import { currentUserContext } from '../contexts/currentUserContext';
 // Navigation component is not implemented yet. 

const Header = ({ handleOpenLoginPopup, isLoggedIn, handleLogout }) => {
    const currentUser = useContext(currentUserContext);
    const location = useLocation(); 
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const headerClass = location.pathname === '/saved-articles' ? 'header header_saved-news header_box-shadow': 'header';
    const logoClass = location.pathname === '/saved-articles' ? 'header_logo header_logo_saved-news' : 'header_logo';

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (  
        <div className={headerClass}>
                <h1 className={logoClass}>NewsExplorer</h1>
                {isMenuOpen ? (
                    <MobileMenuOverlay
                    handleClose={closeMenu}
                    handleOpenLoginPopup={handleOpenLoginPopup}
                    isLoggedIn={isLoggedIn}
                    />
                ) : ( 
                    <Navigation 
                    handleOpenLoginPopup={handleOpenLoginPopup}
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    handleLogout={handleLogout}
                    toggleMenu={toggleMenu}
                    />
                )}
        </div>
     );
}
 
export default Header;

