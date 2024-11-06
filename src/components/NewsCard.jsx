import React, { useState, useContext } from "react";

import "../styles/NewsCard.css";
import bookMark from "../images/bookmark.svg";
import hoveredBookMark from "../images/hoveredBookmark.svg";
import savedBookMark from "../images/savedBookmark.svg";
import trash from "../images/trash.svg";
import hoveredTrash from "../images/hoveredTrash.svg";
import { CurrentPageContext } from "../contexts/CurrentPageContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { saveArticle, deleteArticle, getArticles } from "../utils/api";

const NewsCard = ({
  source,
  title,
  publishedAt,
  description,
  urlToImage,
  isLoggedIn,
  url,
  onArticleDelete,
  keyword,
  currentUser,
}) => {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const { currentPage } = useContext(CurrentPageContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveToggle = async () => {
    try {
      if (isSaved) {
        const savedArticleId = currentUser.savedArticles?.find(
          (article) => article.link === url
        )?._id;

        if (savedArticleId) {
          await deleteArticle(savedArticleId);
          setIsSaved(false);

          const updatedArticles = await getArticles();
          setCurrentUser({ ...currentUser, savedArticles: updatedArticles });
        }
      } else {
        await saveArticle({
          source: source || "Unknown",
          title,
          text: description,
          date: publishedAt,
          keyword,
          link: url,
          image: urlToImage,
        });
        setIsSaved(true);

        const updatedArticles = await getArticles();
        setCurrentUser({ ...currentUser, savedArticles: updatedArticles });
      }
    } catch (error) {
      console.error("Failed to toggle article save state:", error);
    }
  };

  const handleBookmarkClick = () => {
    if (isLoggedIn) {
      handleSaveToggle();
    } else {
      console.warn("Please log in to save articles.");
    }
  };

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="news-card">
      <div className="news-card__image-container">
        <img src={urlToImage} alt={title} className="news-card__image" />
        {currentPage === "/" ? (
          <>
            <button
              className="news-card_action-icon"
              onClick={handleBookmarkClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={
                  isSaved && isLoggedIn
                    ? savedBookMark
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
        ) : (
          currentPage === "/saved-articles" && (
            <>
              <h2 className="news-card__keyword">{keyword}</h2>
              <button
                className="news-card_action-icon"
                onClick={() => {
                  onArticleDelete();
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
          )
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
