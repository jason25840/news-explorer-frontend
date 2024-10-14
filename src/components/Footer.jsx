import GitHub from '../images/github.svg';
import FaceBook from '../images/fb.svg';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return ( 
    <footer className="footer">
      <p className="footer__copyright">© 2024 Supersite, Powered by News API</p>
      <div className="footer__links">
        <Link to="/" className="footer__link footer__link--home">Home</Link>
        <a href="https://tripleten.com/" className="footer__link footer__link--tripleten">TripleTen</a>
        <div className="footer__social-links">
          <a href="https://github.com/jason25840/news-explorer-frontend.git" className="footer__social-link footer__social-link--github">
            <img src={GitHub} alt="GitHub" className="footer__social-icon" />
          </a>
          <a href="https://www.facebook.com/tripleten.tech?mibextid=LQQJ4d" className="footer__social-link footer__social-link--facebook">
            <img src={FaceBook} alt="Facebook" className="footer__social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

