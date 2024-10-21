import React, { useState, useEffect } from 'react'; 
import SavedNewsCardsList from './SavedNewsCardsList';
import SavedNewsHeader from './SavedNewsHeader';
import { getArticles } from '../utils/api';

const SavedNews = ({
    isLoggedIn,
    currentUser,
    handleLogout,
    keyword,
}) => {
    const [savedArticles, setSavedArticles] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
          getArticles()
            .then((articles) => {
              setSavedArticles(articles);
            })
            .catch((err) => console.error('Failed to fetch saved articles:', err));
        }
      }, [isLoggedIn]);

      const keywords = [
        ...new Set(savedArticles.map((article) => article.keyword).filter(Boolean)),
      ];

    return ( 
        <>
        <SavedNewsHeader 
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        handleLogout={handleLogout}
        articleCount={savedArticles.length}
        keywords={keywords}
        />
        <SavedNewsCardsList 
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        keyword={keyword} 
        savedArticles={savedArticles} // Pass articles down to SavedNewsCardsList
        setSavedArticles={setSavedArticles}
        />
        </>
     );
}
 
export default SavedNews