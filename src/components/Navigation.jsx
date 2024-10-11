import '../styles/Navigation.css';
import { useState, useEffect, useContext } from 'react';
import { currentUserContext } from '../contexts/currentUserContext';
import { useLocation, Link } from 'react-router-dom';
import logoutIcon from '../images/logout.svg'; 
import blackLogoutIcon from '../images/black-logout.svg'; 
import MobileMenuOverlay from './MobileMenuOverlay';

const Navigation = ({
    handleOpenLoginPopup,
    isLoggedIn, 
    handleLogout
}) => {
    const { currentUser } = useContext(currentUserContext);
    const location = useLocation();
    const currentPage = location.pathname;  

    const hamburgerMenuClass = location.pathname === '/' ? 'navigation__hamburger-line--white' : 'navigation__hamburger-line--black';
    const navClass = location.pathname === '/saved-articles' ? 'navigation navigation--saved-news' : 'navigation';
    const textColorClass = location.pathname === '/saved-articles' ? 'navigation__text--saved-news' : 'navigation__text';
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
        <div className={`${navClass} navigation__container`}>
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
                            <div className={hamburgerMenuClass}></div>
                            <div className={hamburgerMenuClass}></div>
                        </button>
                    ) : (
                        <>
                            <div className={`navigation__home-container ${currentPage === '/' ? 'active' : ''}`}>
                                <Link to="/" className={`navigation__home-link ${textColorClass}`}>Home</Link>
                            </div>
                            {isLoggedIn && (
                                <div className={`navigation__saved-articles-container ${currentPage === '/saved-articles' ? 'active' : ''}`}>
                                    <Link to="/saved-articles" className={`navigation__saved-articles-link ${textColorClass}`}>Saved articles</Link>
                                </div>
                            )}
                            {isLoggedIn ? (
                                <div className={`navigation__user-info ${textColorClass}`}>
                                    <span className={`navigation__username ${textColorClass}`}>{currentUser?.userName || "guest"}</span>
                                    <img 
                                        src={currentPage === '/saved-articles' ? blackLogoutIcon : logoutIcon} 
                                        alt="logout" 
                                        className="navigation__logout-icon" 
                                        onClick={handleLogout} 
                                    />
                                </div>
                            ) : (
                                <button 
                                    className={`navigation__signin-button ${textColorClass}`}
                                    type='button'
                                    onClick={handleOpenLoginPopup} 
                                >
                                    Sign in
                                </button>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Navigation;

