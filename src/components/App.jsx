import { Routes, Route, useLocation } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { currentUserContext } from '../contexts/currentUserContext';
import { hasSearchedContext } from '../contexts/hasSearchedContext';
import { currentPageContext } from '../contexts/currentPageContext';
import { KeywordProvider } from '../contexts/keywordContext';


import '../styles/App.css';  
import Header from './Header';
import Main from './Main';
import SavedNews from './SavedNews';
import About from './About';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm'; 
import LoginPopup from './LoginPopup';
import SignupPopup from './SignupPopup';
import SuccessPopup from './SuccessPopup';
import * as api from '../utils/api';

function App(setErrors) {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'John' });
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const [currentKeyword, setCurrentKeyword] = useState('');

  const location = useLocation();

  useEffect(() => {
    const token = api.getToken();
    if (token) {
      api.getUser()
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => api.logout()); 
    }
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []); 

  const handleKeywordSearch = (keyword) => {
    setCurrentKeyword(keyword); 
  };

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

  const handleRegistration = (email, password, name) => {
    return api
      .register(email, password, name)
      .then(() => handleOpenSuccessPopup())
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          const backendErrors = error.response.data.details || {};
          setErrors((prevErrors) => ({
            ...prevErrors,
            ...backendErrors,
          }));
        } else {
          console.error("Signup failed:", error);
          alert("Registration failed. Please try again.");
        }
        throw error;
      });
  };
  
  const handleLogin = (email, password) => {
    return api
      .login(email, password)
      .then((data) => {
        if (data.token) {
          api.setToken(data.token);
          return api.getUser();
        } else {
          throw new Error("Token not provided");
        }
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        handleActiveModalClose();
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrors({ general: "Invalid email or password" });
        } else {
          console.error("Login failed:", error);
          alert("Login failed. Please try again.");
        }
        throw error;
      });
  };

  const handleLogout = async () => {
    try {
      console.log('Attempting to log out');
      await api.logout(); 
      localStorage.removeItem('currentUser');
      setCurrentUser(null);
      setIsLoggedIn(false);
      setCurrentPage('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
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
    <div className="app">
      <KeywordProvider>
        <currentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <hasSearchedContext.Provider value={{ hasSearched, setHasSearched }}>
            <currentPageContext.Provider value={{ currentPage, setCurrentPage }}>
            <Routes>
              <Route 
                path="/" 
                element={
                 <>
                <div className={`app__content ${currentPage === '/' ? 'header-main-wrapper' : ''}`}>
                      <Header 
                        handleOpenLoginPopup={handleOpenLoginPopup} 
                        isLoggedIn={isLoggedIn} 
                        currentUser={currentUser} 
                        handleLogout={handleLogout} 
                        /> 
                      <Main 
                        handleOpenLoginPopup={handleOpenLoginPopup}
                        isLoggedIn={isLoggedIn}
                        currentUser={currentUser} 
                        handleLogin={handleLogin}
                        handleLogout={handleLogout}
                        onSearch={handleKeywordSearch}
                      />
                </div>
              <About />
                </> 
               } 
               />
                  <Route 
                    path="/saved-articles" 
                    element={
                      <>
                      <Header 
                      handleOpenLoginPopup={handleOpenLoginPopup} 
                      isLoggedIn={isLoggedIn} 
                      currentUser={currentUser} 
                      handleLogout={handleLogout} 
                      />
                  <SavedNews 
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser} 
                    handleLogout={handleLogout}
                    keyword={currentKeyword} 
                  />
              </>
            }
            />
            </Routes>
            <PopupWithForm />
            <LoginPopup  
                isOpen={activeModal === "login"}
                handleActiveModalClose={handleActiveModalClose}
                handleLogin={handleLogin}
                handleOpenSignupPopup={handleOpenSignupPopup}
            />
            <SignupPopup
              isOpen={activeModal === "signup"}
              handleActiveModalClose={handleActiveModalClose}
              handleRegistration={handleRegistration}
              handleOpenLoginPopup={handleOpenLoginPopup}
              handleOpenSuccessPopup={handleOpenSuccessPopup}
            />
            <SuccessPopup
              isOpen={activeModal === "success"}
              handleActiveModalClose={handleActiveModalClose}
              handleOpenLoginPopup={handleOpenLoginPopup}
            />
            <Footer />
          </currentPageContext.Provider>
        </hasSearchedContext.Provider>  
      </currentUserContext.Provider>
    </KeywordProvider>
    </div>
  );
}

export default App;
