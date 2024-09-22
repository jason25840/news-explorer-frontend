import { useState, useEffect } from 'react';
import { currentUserContext } from '../contexts/currentUserContext';

import '../styles/App.css';
import { BrowserRouter as Router, /*Routes, Route*/ } from 'react-router-dom';
//import Header from './Header'; 
//import SearchForm from './SearchForm';  
import Main from './Main';
import About from './About';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm'; 
import LoginPopup from './LoginPopup';
import SignupPopup from './SignupPopup';
import SuccessPopup from './SuccessPopup';

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'John' });
  
  //const [isLoading, setIsLoading] = useState(false);

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

  const handleLogin = (email, password) => {
    console.log("Logging in with email:", email);
    setCurrentUser({ name: "John", email }); 
    setIsLoggedIn(true);
    setActiveModal(""); 
  };

  const handleRegistration = (values) => {
    console.log("Registering with email:", values.email);
    return new Promise((resolve, reject) => {
      // Simulate a successful registration after 1 second
      setTimeout(() => {
        if (values.email && values.password && values.userName) {
          resolve();
        } else {
          reject(new Error("Invalid registration data"));
        }
      }, 1000);
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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
    <Router>
    <div className="app_page">
      <currentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        {/* <Header handleOpenLoginPopup={handleOpenLoginPopup} isLoggedIn={isLoggedIn} user={currentUser} handleLogout={handleLogout} /> */}
        {/* <SearchForm /> */}
      <div className="app_page-content">
          <Main 
          handleOpenLoginPopup={handleOpenLoginPopup}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser} 
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          />
          <PopupWithForm />
      </div>
      <About />

      <LoginPopup  
          //title="login"
          isOpen={activeModal === "login"}
          handleActiveModalClose={handleActiveModalClose}
          handleLogin={handleLogin}
          handleOpenSignupPopup={handleOpenSignupPopup}
          //handleSubmit={handleSubmit}
          //isLoading={isLoading}
        />
      <SignupPopup
      //title="signup"
      isOpen={activeModal === "signup"}
      handleActiveModalClose={handleActiveModalClose}
      handleRegistration={handleRegistration}
      handleOpenLoginPopup={handleOpenLoginPopup}
      handleOpenSuccessPopup={handleOpenSuccessPopup}
      //handleSubmit={handleSubmit}
      //isLoading={isLoading}
      />
        <SuccessPopup
        isOpen={activeModal === "success"}
        handleActiveModalClose={handleActiveModalClose}
        handleOpenLoginPopup={handleOpenLoginPopup}
      />
      <Footer />
      </currentUserContext.Provider>
    </div>
    </Router>
  );
}

export default App;
