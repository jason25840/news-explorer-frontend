import { KeywordContext } from '../contexts/keywordContext';
import '../styles/Main.css';
import { useState, useContext } from 'react';

import Preloader from './Preloader';
import NothingFound from './NothingFound';
import KeyWordSearch from './KeyWordSearch';
import NewsCardsList from './NewsCardsList';
import { APIkey } from '../utils/constants';
import { saveUserArticle } from '../mockData/SavedArticles';
import { currentUserContext } from '../contexts/currentUserContext';

const Main = ({ handleOpenLoginPopup, isLoggedIn }) => {
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

    fetch(`https://newsapi.org/v2/everything?q=${searchKeyword}&apiKey=${APIkey}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.articles.length > 0) {
          const articlesWithKeyword = data.articles.map((article) => ({
            ...article,
            keyword: searchKeyword,
          }));
          setArticles(articlesWithKeyword);
        } else {
          setArticles([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handleSave = (article) => {
    if (isLoggedIn && currentUser) {
      const savedArticles = saveUserArticle(currentUser.email, article);
      console.log('Saved articles for user:', savedArticles);
    } else {
      handleOpenLoginPopup();
    }
  };

  return (
    <>
      <main className="main">
        <div className="main__content">
          <h1 className="main__header">What's going on in the world?</h1>
          <p className="main__description">
            Find the latest news on any topic and save them in your personal account.
          </p>
        </div>
        <KeyWordSearch onSearch={handleSearch} />
      </main>
      {loading ? (
        <Preloader />
      ) : hasSearched && (error || articles.length > 0) ? (
        error ? (
          <div className="main__error-message">{error.message}</div>
        ) : (
          <NewsCardsList articles={articles} isLoggedIn={isLoggedIn} handleSave={handleSave} />
        )
      ) : hasSearched && articles.length === 0 && !loading ? (
        <NothingFound />
      ) : null}
    </>
  );
};

export default Main;

