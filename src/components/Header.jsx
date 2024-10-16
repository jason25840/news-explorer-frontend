import React, { useState, useContext } from 'react';
import '../styles/Header.css';
import Navigation from './Navigation'; 
import MobileMenuOverlay from './MobileMenuOverlay';
import { useLocation } from 'react-router-dom';
import { currentUserContext } from '../contexts/currentUserContext';

const Header = ({ handleOpenLoginPopup, isLoggedIn, handleLogout }) => {
    const currentUser = useContext(currentUserContext);
    const location = useLocation(); 
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const headerClass = location.pathname === '/saved-articles' ? 'header header--saved-news header--box-shadow' : 'header';
    const logoClass = location.pathname === '/saved-articles' ? 'header__logo header__logo--saved-news' : 'header__logo';

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (  
        <header className={headerClass}>
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
        </header>
     );
}
 
export default Header;

