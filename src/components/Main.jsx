import React, { useState } from 'react';
//import { hasSearchedContext } from '../contexts/hasSearchedContext';

import Header from './Header';
import Preloader from './Preloader';
import NothingFound from './NothingFound';
import KeywordSearch from "./KeyWordSearch";
import NewsCardList from './NewsCardList';// Replace with your actual API key
import '../styles/Main.css';
import { APIkey } from '../utils/constants';

const Main = ({
  handleOpenLoginPopup,
  isLoggedIn,
  user,
  handleLogin,
  handleLogout
}) => {
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);  // Added for search functionality

    //const {hasSearched, setHasSearched} = useContext(hasSearchedContext); 

    const handleSearch = (keyword) => {
      setLoading(true); 
      setError(null); 
      setHasSearched(true);  // Added for search functionality
      fetch(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${APIkey}`)
        .then(response => response.json())
        .then(data => {
          if (data.articles.length > 0) {
            setArticles(data.articles);
          } else {
            setArticles([]);
          }
          setLoading(false); 
    })
    .catch(error => {
          setError(error);
          setLoading(false);
    });
  };
   // Fetch news data based on the keyword and update the state
    return ( 
      <>
      <div className="main__page">
      <Header 
          handleOpenLoginPopup={handleOpenLoginPopup} 
          isLoggedIn={isLoggedIn}
          user={user}
          handleLogin={handleLogin} 
          handleLogout={handleLogout}
          />
        <div className="main-page__content">
            <h1 className="main-page__header">What's going on in the world?</h1>
                <p className="main-page__description">Find the latest news on any topic and save them in your personal account.</p>
                {/* Search bar */}
            <KeywordSearch onSearch={handleSearch} />
        </div>
        </div>
                {loading ? (
            <Preloader />
        ) : hasSearched && (error || articles.length > 0) ? (
            error ? (
              <div className="error-message">{error}</div>
            ) : (
              <NewsCardList 
                articles={articles} 
                isLoggedIn={isLoggedIn}
                handleSave={() => {}} /> 
            )
        ) : hasSearched && articles.length === 0 && !loading ? (
            <NothingFound />
        ) : null}
        </>
     );
}
 
export default Main;