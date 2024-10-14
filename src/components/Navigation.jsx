import '../styles/Navigation.css';
import { useState, useEffect, useContext } from 'react';
import { currentUserContext } from '../contexts/currentUserContext';
import { useLocation, Link } from 'react-router-dom';
import logoutIcon from '../images/logout.svg'; 
import blackLogoutIcon from '../images/black-logout.svg'; 
import MobileMenuOverlay from './MobileMenuOverlay';

const Navigation = ({ handleOpenLoginPopup, isLoggedIn, handleLogout }) => {
    const { currentUser } = useContext(currentUserContext);
    const location = useLocation();
    const currentPage = location.pathname;

    const isSavedNewsPage = currentPage === '/saved-articles';
    const hamburgerLineClass = isSavedNewsPage
      ? 'navigation__hamburger-line--black'
      : 'navigation__hamburger-line--white';

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 425);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 425);
            if (window.innerWidth > 425) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className={`navigation ${isSavedNewsPage ? 'navigation--saved-news' : ''}`}>
            {isMobileView && isMenuOpen ? (
                <MobileMenuOverlay 
                    handleClose={closeMenu}
                    handleOpenLoginPopup={handleOpenLoginPopup}
                    isLoggedIn={isLoggedIn}
                    handleLogout={handleLogout}
                    currentUser={currentUser}
                />
            ) : (
                <>
                    {isMobileView ? (
                        <button className="navigation__hamburger-menu" onClick={toggleMenu}>
                            <div className={hamburgerLineClass}></div>
                            <div className={hamburgerLineClass}></div>
                        </button>
                    ) : (
                        <>
                            <div className={`navigation__item--home ${currentPage === '/' ? 'navigation__item--home-active' : ''}`}>
                                <Link to="/" className="navigation__link">Home</Link>
                            </div>
                            {isLoggedIn && (
                                <div className={`navigation__item--saved-articles ${currentPage === '/saved-articles' ? 'navigation__item--saved-articles-active' : ''}`}>
                                    <Link to="/saved-articles" className="navigation__link">Saved articles</Link>
                                </div>
                            )}
                            {isLoggedIn ? (
                                <div className="navigation__user">
                                    <span className={`navigation__username ${currentPage === '/' ? 'navigation__username-white' : ''}`}>{currentUser?.userName || 'guest'}</span>
                                    <img
                                        src={isSavedNewsPage ? blackLogoutIcon : logoutIcon}
                                        alt="logout"
                                        className="navigation__logout-icon"
                                        onClick={handleLogout}
                                    />
                                </div>
                            ) : (
                                <button 
                                    className="navigation__signin-button"
                                    type="button"
                                    onClick={handleOpenLoginPopup}
                                >
                                    Sign in
                                </button>
                            )}
                        </>
                    )}
                </>
            )}
        </nav>
    );
};

export default Navigation;

