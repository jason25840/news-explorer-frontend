import React from 'react';
import "../styles/NewsCard.css"; // Assuming you'll style it here

const NewsCard = ({ source, title, publishedAt, description, urlToImage, isLoggedIn, handleSave }) => {
  
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <div className="news-card">
      <div className="news-card__image-container">
        <img src={urlToImage} alt={title} className="news-card__image" />
      </div>
      <div className="news-card__content">
        <div className="news-card__header">
          <p className="news-card__source">{source.name}</p>
          <button
            className={`news-card__save-btn ${isLoggedIn ? 'active' : ''}`}
            onClick={isLoggedIn ? handleSave : null}
            onMouseOver={!isLoggedIn ? () => alert('Sign in to save articles') : null}
          >
            {/* Save icon can be a heart, bookmark, etc. */}
            <i className="save-icon"></i>
          </button>
        </div>
        <h2 className="news-card__title">{title}</h2>
        <p className="news-card__date">{formattedDate}</p>
        <p className="news-card__description">{description}</p>
      </div>
    </div>
  );
};

export default NewsCard;
