import { useState, useEffect } from 'react';

import '../styles/App.css';
import { BrowserRouter as Router, /*Routes, Route*/ } from 'react-router-dom';
import Header from './Header'; 
import SearchForm from './SearchForm';  
/*import Main from './Main';*/
import About from './About';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm'; 
import LoginPopup from './LoginPopup';
import SignupPopup from './SignupPopup';
import SuccessPopup from './SuccessPopup';

function App() {
  const [activeModal, setActiveModal] = useState("");
  //const [isLoading, setIsLoading] = useState(false);

  const handleOpenLoginPopup = () => {
    setActiveModal("login");
  };

  const handleOpenSignupPopup = () => {
    setActiveModal("signup");
  };

  //const handleOpenSuccessPopup = () => {
  //  setActiveModal("success");
  //};
  
  const handleActiveModalClose = () => {
    setActiveModal("");
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
      <div className="app_page-content">
          <Header 
          handleOpenLoginPopup={handleOpenLoginPopup} 
          />
          <SearchForm />
          <PopupWithForm />
      </div>
      <About />

      <LoginPopup  
          //title="login"
          isOpen={activeModal === "login"}
          handleActiveModalClose={handleActiveModalClose}
          //handleLogin={handleLogin}
          handleOpenSignupPopup={handleOpenSignupPopup}
          //handleSubmit={handleSubmit}
          //isLoading={isLoading}
        />
      <SignupPopup
      //title="signup"
      isOpen={activeModal === "signup"}
      handleActiveModalClose={handleActiveModalClose}
      //handleRegistration={handleRegistration}
      handleOpenLoginPopup={handleOpenLoginPopup}
      //handleOpenSuccessPopup={handleOpenSuccessPopup}
      //handleSubmit={handleSubmit}
      //isLoading={isLoading}
      />
        <SuccessPopup
        isOpen={activeModal === "success"}
        handleActiveModalClose={handleActiveModalClose}
        handleOpenLoginPopup={handleOpenLoginPopup}
      />
      <About />
      <Footer />
    </div>
    </Router>
  );
}

export default App;
