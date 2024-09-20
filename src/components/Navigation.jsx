import '../styles/Navigation.css';
import { Link } from 'react-router-dom';
import whiteStroke from '../images/white-stroke.svg'; 
import logoutIcon from '../images/logout.svg';  

const Navigation = ({
    handleOpenLoginPopup,
    isLoggedIn, 
    user, 
    handleLogout
}) => {
    return (
        <div className="nav_container">
            <Link to="/" className="nav_home">Home</Link>
            <img src={ whiteStroke } className="nav-home_active" alt="home_link-underline" />
            {isLoggedIn ? (
                <>
                    <Link to="/saved-articles" className="nav_saved-articles">Saved articles</Link>
                    <div className="nav_user-info">
                        <span className="nav_username">{user.name}</span>
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