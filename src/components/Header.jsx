import '../styles/Header.css';
import Navigation from './Navigation';  // Navigation component is not implemented yet. 

const Header = ({ handleOpenLoginPopup }) => {
    return ( 
        <div className="header">
                <h1 className="header_logo">NewsExplorer</h1>
                <Navigation 
                handleOpenLoginPopup={handleOpenLoginPopup}
                />
        </div>
     );
}
 
export default Header;