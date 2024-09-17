import '../styles/App.css';
import { BrowserRouter as Router, /*Routes, Route*/ } from 'react-router-dom';
import Header from './Header'; 
import SearchForm from './SearchForm';  
/*import Main from './Main';*/
import About from './About';
import Footer from './Footer';

function App() {
  return (
    <Router>
    <div className="app_page">
      <div className="app_page-content">
          <Header />
          <SearchForm />
      </div>
      <About />
      <Footer />
    </div>
    </Router>
  );
}

export default App;
