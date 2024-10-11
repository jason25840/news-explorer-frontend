import GitHub from '../images/github.svg';
import FaceBook from '../images/fb.svg';
import '../styles/Footer.css';
import { Link } from'react-router-dom';

const Footer = () => {
    return ( 
        <footer className="footer_content">
            <p className="copyright">© 2024 Supersite, Powered by News API</p>
            <div className="footer_links">
                <Link to="/" className='footer_link home_link'>Home</Link>
                <a href="https://tripleten.com/" className="footer_link triple_link">TripleTen</a>
                <div className="social_links">
                    <a href="https://github.com/jason25840/news-explorer-frontend.git" className="gitHub_link">
                        <img src={GitHub} alt="GitHub" className="social-icon" />
                    </a>
                    <a href="https://www.facebook.com/tripleten.tech?mibextid=LQQJ4d" className="faceBook_link">
                        <img src={FaceBook} alt="Facebook" className="social-icon" />
                    </a>
                </div>
            </div>
        </footer>
      );
}
 
export default Footer;