import React from 'react';  
import NewsCard from './NewsCard'; 
import '../styles/NewsCardsList.css'; 
import '../styles/SavedNewsCardsList.css';
import { deleteArticle } from '../utils/api';

const SavedNewsCardsList = ({ 
  isLoggedIn,
  currentUser,
  keyword,
  savedArticles,
  setSavedArticles,}) => {

  const handleArticleDelete = (id) => {
    deleteArticle(id)
      .then(() => {
        setSavedArticles((prevArticles) =>
          prevArticles.filter((article) => article._id !== id)
        );
      })
      .catch((err) => console.error('Failed to delete article:', err));
  };

  return (
    <section className="saved-news">
      <div className="saved-news__cards">
        {savedArticles.length > 0 ? (
          savedArticles.map((article, index) => (
            <NewsCard
              key={article._id}
              source={article.source}
              title={article.title}
              publishedAt={new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              description={article.description}
              keyword={article.keyword}
              urlToImage={article.urlToImage}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              url={article.url}
              onArticleDelete={() => handleArticleDelete(article._id)}
            />
          ))
        ) : (
          <p className="saved-news__no-articles">No saved articles found.</p>
        )}
      </div>
    </section>
  );
};

export default SavedNewsCardsList;

