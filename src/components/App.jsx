import { Routes, Route, useLocation } from "react-router-dom";

import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { HasSearchedContext } from "../contexts/HasSearchedContext";
import { CurrentPageContext } from "../contexts/CurrentPageContext";
import { KeywordProvider } from "../contexts/KeywordContext";
import { APIkey } from "../utils/constants";

import "../styles/App.css";
import Header from "./Header";
import Main from "./Main";
import SavedNews from "./SavedNews";
import About from "./About";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import LoginPopup from "./LoginPopup";
import SignupPopup from "./SignupPopup";
import SuccessPopup from "./SuccessPopup";
import * as api from "../utils/api";
import ProtectedRoute from "./ProtectedRoute";

function App(setErrors) {
  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "Guest" });
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const token = api.getToken();
    if (token) {
      api
        .getUser()
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

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
      await api.logout();
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
      setIsLoggedIn(false);
      setCurrentPage("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        handleActiveModalClose();
      }
    }

    if (!activeModal) {
      return;
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeModal]);

  const handleSearch = (searchKeyword) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    setCurrentKeyword(searchKeyword);

    fetch(
      `https://nomoreparties.co/news/v2/everything?q=${searchKeyword}&apiKey=${APIkey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.articles && data.articles.length > 0) {
          const articlesWithKeyword = data.articles.map((article) => ({
            ...article,
            keyword: searchKeyword,
          }));
          setArticles(articlesWithKeyword);
        } else {
          setArticles([]);
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="app">
      <KeywordProvider>
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <HasSearchedContext.Provider value={{ hasSearched, setHasSearched }}>
            <CurrentPageContext.Provider
              value={{ currentPage, setCurrentPage }}
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <div
                        className={`app__content ${
                          currentPage === "/" ? "header-main-wrapper" : ""
                        }`}
                      >
                        <Header
                          handleOpenLoginPopup={handleOpenLoginPopup}
                          isLoggedIn={isLoggedIn}
                          handleLogout={handleLogout}
                        />
                        <Main
                          handleOpenLoginPopup={handleOpenLoginPopup}
                          isLoggedIn={isLoggedIn}
                          currentUser={currentUser}
                          handleLogin={handleLogin}
                          handleLogout={handleLogout}
                          onSearch={handleSearch}
                          hasSearched={hasSearched}
                          articles={articles}
                          loading={loading}
                          error={error}
                        />
                      </div>
                      <About />
                    </>
                  }
                />
                <Route
                  element={
                    <ProtectedRoute
                      isLoggedIn={isLoggedIn}
                      handleOpenLoginPopup={handleOpenLoginPopup}
                    />
                  }
                >
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
                </Route>
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
            </CurrentPageContext.Provider>
          </HasSearchedContext.Provider>
        </CurrentUserContext.Provider>
      </KeywordProvider>
    </div>
  );
}

export default App;
