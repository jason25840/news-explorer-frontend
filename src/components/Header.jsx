import React, {useContext} from 'react';
import '../styles/Header.css';
import Navigation from './Navigation'; 
import { useLocation } from 'react-router-dom';
import { currentUserContext } from '../contexts/currentUserContext';
 // Navigation component is not implemented yet. 

const Header = ({ handleOpenLoginPopup, isLoggedIn, handleLogout }) => {
    const currentUser = useContext(currentUserContext);
    const location = useLocation();  

    const headerClass = location.pathname === '/saved-articles' ? 'header header_saved-news header_box-shadow': 'header';
    const logoClass = location.pathname === '/saved-articles' ? 'header_logo header_logo_saved-news' : 'header_logo';

    return (  
        <div className={headerClass}>
                <h1 className={logoClass}>NewsExplorer</h1>
                <Navigation 
                handleOpenLoginPopup={handleOpenLoginPopup}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
                handleLogout={handleLogout}
                />
        </div>
     );
}
 
export default Header;

