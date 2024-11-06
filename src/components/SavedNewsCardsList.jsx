import React from "react";
import NewsCard from "./NewsCard";
import "../styles/NewsCardsList.css";
import "../styles/SavedNewsCardsList.css";
import { deleteArticle } from "../utils/api";

const SavedNewsCardsList = ({
  isLoggedIn,
  currentUser,
  savedArticles,
  setSavedArticles,
}) => {
  const handleArticleDelete = (id) => {
    deleteArticle(id)
      .then(() => {
        setSavedArticles((prevArticles) =>
          prevArticles.filter((article) => article._id !== id)
        );
      })
      .catch((err) => console.error("Failed to delete article:", err));
  };

  return (
    <section className="saved-news">
      <div className="saved-news__cards">
        {savedArticles.length > 0 ? (
          savedArticles.map((article) => (
            <NewsCard
              key={article._id}
              source={article.source}
              title={article.title}
              publishedAt={article.date}
              description={article.text}
              keyword={article.keyword}
              urlToImage={article.image}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              url={article.link}
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
