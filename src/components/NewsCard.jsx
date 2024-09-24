import React from 'react';
import { useState } from 'react';
import "../styles/NewsCard.css"; 
import bookMark from '../images/bookmark.svg';
import hoveredBookMark from '../images/hoveredBookmark.svg';
import selectedBookMark from '../images/selectedBookmark.svg';

const NewsCard = ({ source, title, publishedAt, description, urlToImage, isLoggedIn, handleSave }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  const handleBookmarkClick = () => {
    if (isLoggedIn) {
      setIsSelected(!isSelected);
      handleSave(); // Call save function when clicked and logged in
    }
  };

  return (
    <div className="news-card">
      <div className="news-card__image-container">
        <img src={urlToImage} alt={title} className="news-card__image" />
        <div className="news-card__save-container">
         {/* Save Button Positioned in Image Container */}
         <button
            className="save-icon"
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
              className="save-icon__image"
            />
          </button>
          {/* Tooltip for non-logged-in users */}
          {!isLoggedIn && (
            <div className="news-card__tooltip">
              <span className="news-card__tooltip-text">
                Sign in to save articles
              </span>
            </div>
          )}
        </div>
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
