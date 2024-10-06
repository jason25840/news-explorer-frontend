import React, { useState, useContext, useEffect } from 'react';

import "../styles/NewsCard.css"; 
import bookMark from '../images/bookmark.svg';
import hoveredBookMark from '../images/hoveredBookmark.svg';
import selectedBookMark from '../images/selectedBookmark.svg';
import trash from '../images/trash.svg';
import hoveredTrash from '../images/hoveredTrash.svg';
import { deleteUserArticle, saveUserArticle } from '../mockData/SavedArticles';
import { currentPageContext } from '../contexts/currentPageContext';

const NewsCard = ({ source, title, publishedAt, description, urlToImage, isLoggedIn, url, onArticleDelete, keyword, currentUser }) => {
  const { currentPage } = useContext(currentPageContext);

  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isSaved, setIsSaved] = useState(false); 

  useEffect(() => { 
    if (isLoggedIn && currentUser) {
      const isArticleSaved = currentUser.savedArticles.some(article => article.url === url);
      setIsSaved(isArticleSaved);
    }
  }, [isLoggedIn, currentUser, url]);

  const handleSave = () => {
    if (!currentUser?.email) {
      console.error("User email is undefined, cannot save or delete the article.");
      return;
    }
    if (isSaved) {
      deleteUserArticle(currentUser.email, url);
      setIsSaved(false); 
      if (onArticleDelete) {
      onArticleDelete(url);
      } 
    } else {
      saveUserArticle(currentUser.email, { source, title, publishedAt, description, urlToImage, url, keyword });
      setIsSaved(true);  
    }
  };

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  const handleBookmarkClick = () => {
    if (isLoggedIn) {
      setIsSelected(!isSelected);
      handleSave(); 
    }
  };

  console.log({source})

  return (
    <div className="news-card">
      <div className="news-card__image-container">
        <img src={urlToImage} alt={title} className="news-card__image" />
        {currentPage === '/' ? (
        <>
         <button
            className="news-card_action-icon"
            onClick={handleBookmarkClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
          <img 
              src={
                isSelected && isLoggedIn 
                  ? selectedBookMark 
                  : isHovered 
                  ? hoveredBookMark 
                  : bookMark
              }
              alt="Save article"
              className="news-card_save-icon__image"
          />
          </button> 
          
          {isHovered && !isLoggedIn && (
            <div className="news-card__tooltip">
              <span className="news-card__tooltip-text">
                Sign in to Save articles
              </span>
            </div>
          )}
        </>
         ) : currentPage === '/saved-articles' && (
        <>
          <h2 className="news-card__keyword">{keyword}</h2>
          <button
            className="news-card_action-icon"
            onClick={() => {
              handleSave(); 
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
              <img 
                src={isHovered ? hoveredTrash : trash}
                alt="Delete article"
                className="news-card_delete-icon__image"
              />
            </button>
        {isHovered && (
            <div className="news-card__tooltip">
              <span className="news-card__tooltip-text">
                Remove from saved
              </span>
            </div>
          )}
          </>
        )}
        </div>
        
      <div className="news-card__content">
        <p className="news-card__date">{formattedDate}</p>
        <h2 className="news-card__title">{title}</h2>
        <p className="news-card__description">{description}</p>
        <p className="news-card__source">{source}</p>
      </div>
    </div>
  );
};

export default NewsCard;
