import React, { useState, useContext } from 'react';
import { KeywordContext } from '../contexts/keywordContext';
//import { hasSearchedContext } from '../contexts/hasSearchedContext';

import Preloader from './Preloader';
import NothingFound from './NothingFound';
import KeywordSearch from "./KeyWordSearch";
import NewsCardsList from './NewsCardsList';
import '../styles/Main.css';
import { APIkey } from '../utils/constants';
import { saveUserArticle } from '../mockData/SavedArticles';
import { currentUserContext } from '../contexts/currentUserContext';
const Main = ({
  handleOpenLoginPopup,
  isLoggedIn,
}) => {
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const { setKeyword } = useContext(KeywordContext);
    const { currentUser } = useContext(currentUserContext); 


    const handleSearch = (searchKeyword) => {
      setLoading(true); 
      setError(null); 
      setHasSearched(true);
      setKeyword(searchKeyword); 
      console.log("searchedKeyword:", searchKeyword) 
      fetch(`https://newsapi.org/v2/everything?q=${searchKeyword}&apiKey=${APIkey}`)
        .then(response => response.json())
        .then(data => {
          if (data.articles.length > 0) {
            const articlesWithKeyword = data.articles.map(article => ({
              ...article,
              keyword: searchKeyword  // Attach the keyword to each article
            }));
            setArticles(articlesWithKeyword);
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

  const handleSave = (article) => {
    if (isLoggedIn && currentUser) {
      const savedArticles = saveUserArticle(currentUser.email, article);
      console.log('saved articles for user', savedArticles);
    } else {
      handleOpenLoginPopup();
    }
  };
   // Fetch news data based on the keyword and update the state
    return ( 
      <>
      <div className="main__page">
        <div className="main-page__content">
            <h1 className="main-page__header">What's going on in the world?</h1>
                <p className="main-page__description">Find the latest news on any topic and save them in your personal account.</p>
                {/* Search bar */}
        </div>
            <KeywordSearch onSearch={handleSearch} />
      </div>
                {loading ? (
            <Preloader />
        ) : hasSearched && (error || articles.length > 0) ? (
            error ? (
              <div className="error-message">{error}</div>
            ) : (
              <NewsCardsList 
                articles={articles} 
                isLoggedIn={isLoggedIn}
                handleSave={handleSave} /> 
            )
        ) : hasSearched && articles.length === 0 && !loading ? (
            <NothingFound />
        ) : null}
        </>
     );
}
 
export default Main;