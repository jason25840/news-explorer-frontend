import '../styles/Navigation.css';

import { useContext } from 'react';
import { currentUserContext } from '../contexts/currentUserContext';
//import { currentPageContext } from '../contexts/currentPageContext';
import { useLocation, Link } from 'react-router-dom';
import whiteStroke from '../images/white-stroke.svg'; 
import darkStroke from '../images/dark-stroke.svg';
import logoutIcon from '../images/logout.svg'; 
import blackLogoutIcon from '../images/black-logout.svg'; 

const Navigation = ({
    handleOpenLoginPopup,
    isLoggedIn, 
    handleLogout
}) => {
    const { currentUser } = useContext(currentUserContext);
    
    const location = useLocation();
    const currentPage = location.pathname;  

    const navClass = location.pathname === '/saved-articles' ? 'navigation navigation_saved-news' : 'navigation';
    const textColorClass = location.pathname === '/saved-articles' ? 'navigation_text-color_saved-news' : 'navigation_text-color';

    return (
        <div className={`nav_container ${navClass}`}>
            <div className={`nav-home__container ${currentPage === '/' ? 'active' : ''}`}>
            <Link to="/" className={`nav_home ${textColorClass}`}>Home</Link>
            {/*{currentPage !== '/saved-articles' && (
            <img src={ whiteStroke } 
            className="nav_home-underline" 
            alt="home_link-underline" />
            )}*/}
            </div>
            {isLoggedIn && (
                    <div className={`nav-saved-articles__container ${currentPage === '/saved-articles' ? 'active' : ''}`}>
                      <Link to="/saved-articles" className={`nav_saved-articles ${textColorClass}`}>Saved articles</Link>
                      {/*{currentPage !== '/' && (
                      <img src={darkStroke} 
                      className="nav_saved-articles-underline" 
                      alt="saved_articles-underline" />)}*/}
                    </div>
                  )}
                    {isLoggedIn ? (
                    <div className={`nav_user-info ${textColorClass}`}>
                        <span className="nav_username">{currentUser?.userName || "guest"}</span>
                        <img src={currentPage === '/saved-articles' ? blackLogoutIcon : logoutIcon} 
                        alt="logout" 
                        className="nav_logout-icon" 
                        onClick={handleLogout} 
                        />
                    </div>
            ) : (
            <button 
            className={`nav_signin-button ${textColorClass}`}
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