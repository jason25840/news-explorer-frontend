import { useState, useContext } from 'react';
import { currentUserContext } from '../contexts/currentUserContext';
import NewsCard from './NewsCard'; 
import '../styles/NewsCardsList.css';

const NewsCardsList = ({ articles, isLoggedIn, handleArticleDelete }) => {
  const [visibleArticles, setVisibleArticles] = useState(3);
  const { currentUser } = useContext(currentUserContext);

  const handleShowMore = () => {
    setVisibleArticles((prevVisibleArticles) => prevVisibleArticles + 3);
  };

  return (
    <section className="news-cards">
      <h2 className="news-cards__header">Search results</h2>
      <div className="news-cards__container">
        {articles.slice(0, visibleArticles).map((article) => (
          <NewsCard
            key={article.url}
            id={article.url}
            source={article.source.name}
            title={article.title}
            publishedAt={article.publishedAt}
            description={article.description || article.content}
            keyword={article.keyword}
            urlToImage={article.urlToImage}
            url={article.url}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onArticleDelete={() => handleArticleDelete(article.url)}
          />
        ))}
      </div>
      {visibleArticles < articles.length && (
        <button 
          className="news-cards__button" 
          onClick={handleShowMore}
        >
          Show more
        </button>
      )}
    </section>
  );
};

export default NewsCardsList;

