import '../styles/Navigation.css';

import { useContext } from 'react';
import { currentUserContext } from '../contexts/currentUserContext';
import { Link } from 'react-router-dom';
import whiteStroke from '../images/white-stroke.svg'; 
import logoutIcon from '../images/logout.svg';  

const Navigation = ({
    handleOpenLoginPopup,
    isLoggedIn, 
    handleLogout
}) => {
    const currentUser = useContext(currentUserContext);

    return (
        <div className="nav_container">
            <Link to="/" className="nav_home">Home</Link>
            <img src={ whiteStroke } 
            className={`nav-home_active-logged-out ${isLoggedIn ? 'nav-home_active-logged-in' : ''}`}
            alt="home_link-underline" />
            {isLoggedIn ? (
                <>
                    <Link to="/saved-articles" className="nav_saved-articles">Saved articles</Link>
                    <div className="nav_user-info">
                        <span className="nav_username">{currentUser?.name || "guest"}</span>
                        <img src={logoutIcon} alt="logout" className="nav_logout-icon" onClick={handleLogout} />
                    </div>
                </>
            ) : (
            <button 
            className="nav_signin-button"
            type='button'
            onClick={handleOpenLoginPopup} 
            >
            Sign in
            </button>
            )}
        </div>
      );
}
 
export default Navigation;