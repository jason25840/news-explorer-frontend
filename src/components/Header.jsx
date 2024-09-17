import '../styles/Header.css';
import Navigation from './Navigation';  // Navigation component is not implemented yet. 

const Header = () => {
    return ( 
        <div className="header">
                <h1 className="header_logo">NewsExplorer</h1>
                <Navigation />
        </div>
     );
}
 
export default Header;