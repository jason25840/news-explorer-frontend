import { Routes, Route, useLocation } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { currentUserContext } from '../contexts/currentUserContext';
import { hasSearchedContext } from '../contexts/hasSearchedContext';
import { currentPageContext } from '../contexts/currentPageContext';
import { KeywordProvider } from '../contexts/keywordContext';

//import { useLocation } from'react-router-dom';

import '../styles/App.css';  
import Header from './Header';
import Main from './Main';
import SavedNews from './SavedNews';
import About from './About';
import Footer from './Footer';
import { loginUser, registerUser } from '../mockData/SavedArticles';
import PopupWithForm from './PopupWithForm'; 
import LoginPopup from './LoginPopup';
import SignupPopup from './SignupPopup';
import SuccessPopup from './SuccessPopup';

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'John' });
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const [currentKeyword, setCurrentKeyword] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []); 

  const handleKeywordSearch = (keyword) => {
    setCurrentKeyword(keyword); 
  };
  
  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);
  

  const handleOpenLoginPopup = () => {
    setActiveModal("login");
  };

  const handleOpenSignupPopup = () => {
    setActiveModal("signup");
  };

  const handleOpenSuccessPopup = () => {
    setActiveModal("success");
  };
  
  const handleActiveModalClose = () => {
    setActiveModal("");
  };

  const handleRegistration = (values) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (values.email && values.password && values.userName) {
          const newUser = registerUser({ email: values.email, password: values.password, userName: values.userName });
          setCurrentUser(newUser);  // Set the newly registered user as the current user
          setIsLoggedIn(true);
          resolve();
        } else {
          reject(new Error("Invalid registration data"));
        }
      }, 1000);
    });
  };

  const handleLogin = (email, password) => {
    const user = loginUser(email, password);  
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));  
      setIsLoggedIn(true);
      setActiveModal("");  
    } else {
      console.error("Login failed: Incorrect email or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('currentUser');  
    setCurrentUser(null); 
  };
  

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setActiveModal("");
      }
    }
  
    if (!activeModal) {
      return;
    }
  
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeModal]);

  return (
    <div className="app_page">{/*{`app_page ${currentPage === '/saved-articles' ? 'app__saved-news-page' : ''}`}>*/}
      <KeywordProvider>
        <currentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <hasSearchedContext.Provider value={{ hasSearched, setHasSearched }}>
            <currentPageContext.Provider value={{ currentPage, setCurrentPage }}>
            <div className="app__main-page-content">
              <Header 
                handleOpenLoginPopup={handleOpenLoginPopup} 
                isLoggedIn={isLoggedIn} 
                currentUser={currentUser} 
                handleLogout={handleLogout} /> 
            <Routes>
              <Route 
                path="/" 
                element={
            <>
              <Main 
                handleOpenLoginPopup={handleOpenLoginPopup}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser} 
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                onSearch={handleKeywordSearch}
              />
              <About />
            </>
            }
            />
              <Route 
                path="/saved-articles" 
                element={
              <SavedNews 
                isLoggedIn={isLoggedIn}
                currentUser={currentUser} 
                handleLogout={handleLogout}
                keyword={currentKeyword} 
              />
            }/>
            </Routes>
            <PopupWithForm />
            </div>
            <LoginPopup  
                //title="login"
                isOpen={activeModal === "login"}
                handleActiveModalClose={handleActiveModalClose}
                handleLogin={handleLogin}
                handleOpenSignupPopup={handleOpenSignupPopup}
                //isLoading={isLoading}
            />
            <SignupPopup
            //title="signup"
              isOpen={activeModal === "signup"}
              handleActiveModalClose={handleActiveModalClose}
              handleRegistration={handleRegistration}
              handleOpenLoginPopup={handleOpenLoginPopup}
              handleOpenSuccessPopup={handleOpenSuccessPopup}
            //isLoading={isLoading}
            />
            <SuccessPopup
              isOpen={activeModal === "success"}
              handleActiveModalClose={handleActiveModalClose}
              handleOpenLoginPopup={handleOpenLoginPopup}
            />
            <Footer />
          </currentPageContext.Provider>
        </hasSearchedContext.Provider>  {/* Added for search functionality */}  {/* Added for search functionality */}  {/* Added for search functionality */}  {/* Added for search functionality */}  {/* Added for search functionality */}  {/* Added for search functionality */}  {/* Added for search functionality */}  {/* Added for search functionality */}  {/* Added for search functionality */}  {/* Added for search functionality */}  {/* Added for search functionality */}  {/* Added for search functionality */}  {/* Added for search functionality */}
      </currentUserContext.Provider>
    </KeywordProvider>
    </div>
  );
}

export default App;
