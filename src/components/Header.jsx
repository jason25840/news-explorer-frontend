import '../styles/Header.css';
import Navigation from './Navigation'; 
 // Navigation component is not implemented yet. 

const Header = ({ handleOpenLoginPopup, isLoggedIn, user, handleLogout }) => {
    return (  
        <div className="header">
                <h1 className="header_logo">NewsExplorer</h1>
                <Navigation 
                handleOpenLoginPopup={handleOpenLoginPopup}
                isLoggedIn={isLoggedIn}
                user={user}
                handleLogout={handleLogout}
                />
        </div>
     );
}
 
export default Header;