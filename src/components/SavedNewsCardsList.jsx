import React, { useState, useEffect, useContext } from 'react';
import { currentUserContext } from '../contexts/currentUserContext';  
import NewsCard from './NewsCard'; 
import '../styles/NewsCardsList.css'; 
import '../styles/SavedNewsCardsList.css'
import { fetchSavedArticlesForUser, deleteUserArticle } from '../mockData/SavedArticles';


const SavedNewsCardsList = ( isLoggedIn ) => {
  const [ savedArticles, setSavedArticles] = useState([]);
  const { currentUser } = useContext(currentUserContext);// Use useState hook to manage saved articles state
 
  useEffect(() => {
    if (currentUser) {
    const articles = fetchSavedArticlesForUser(currentUser.email);
    setSavedArticles(articles);
    } 
  }, [currentUser]);

  const handleArticleDelete = (url) => {
    if (currentUser) {
  const updatedArticles =  deleteUserArticle(currentUser.email, url);
    setSavedArticles(updatedArticles); 
    }
  };

    return ( 
      <div className="saved-news__card-section">
        <div className="saved-news__cards-container">
      {savedArticles.length > 0 ? savedArticles.map((article, index) => {
        return <NewsCard
          key={index} 
          source={article.source}
          title={article.title}
          publishedAt={new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          description={article.description}
          keyword={article.keyword}
          urlToImage={article.urlToImage} 
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          url={article.url} 
          onArticleDelete={() => handleArticleDelete(article.url)}
        /> 
      }) : <p>No saved articles found.</p>}
        </div>
      </div>
     );
}

 
export default SavedNewsCardsList;