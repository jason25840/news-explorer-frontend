import '../styles/Navigation.css';
import { Link } from 'react-router-dom';
import whiteStroke from '../images/white-stroke.svg';  // SVG image for underline effect.  // This image is not implemented yet.  // You should replace it with your own SVG image.  //

const Navigation = () => {
    return (
        <div className="nav_container">
            <Link to="/" className="nav_home">Home</Link>
            <img src={ whiteStroke } className="nav-home_active" alt="home_link-underline" />
            <button className="nav_signin-button">Sign in</button>
        </div>
      );
}
 
export default Navigation;