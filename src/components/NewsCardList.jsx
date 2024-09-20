import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";
import { useState, useContext } from "react";
import { searchResultContext } from "../../contexts/searchResultContext";
import { hasSearchedContext } from "../../contexts/hasSearchedContext";

const NewsCardList = ({
  handleSaveArticle,
  handleRemoveArticle,
  onLoginClick,
}) => {
  const [cardsDisplayed, setCardsDisplayed] = useState(3);

  const { searchResult } = useContext(searchResultContext);

  const { hasSearched } = useContext(hasSearchedContext);

  const increaseVisibleCards = () => {
    setCardsDisplayed(cardsDisplayed + 3);
  };

  return (
    <div className="news__card-section">
      {hasSearched ? (
        <>
          <div className="news__cards-header">Search results</div>
          <div className="news__cards-container">
            {searchResult.slice(0, cardsDisplayed).map((result, index) => (
              <li className="news__card-list" key={result.id || index}>
                <NewsCard
                  newsData={result}
                  handleSaveArticle={handleSaveArticle}
                  handleRemoveArticle={handleRemoveArticle}
                  onClick={onLoginClick}
                />
              </li>
            ))}
          </div>
          <button
            className={`news__cards-button ${
              cardsDisplayed >= searchResult.length ? "hidden" : ""
            }`}
            onClick={increaseVisibleCards}
          >
            Show more
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default NewsCardList;