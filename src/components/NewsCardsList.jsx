import { useState, useContext } from 'react';
import { currentUserContext } from '../contexts/currentUserContext';

import NewsCard from './NewsCard'; 
import '../styles/NewsCardsList.css';  // Assuming you'll style it here

const NewsCardsList = ({ articles, isLoggedIn }) => {
const [visibleArticles, setVisibleArticles] = useState(3);
const { currentUser } = useContext(currentUserContext);


const handleShowMore = () => {
  setVisibleArticles(prevVisibleArticles => prevVisibleArticles + 3);
};

return (
    <div className="news__card-section">
      <h2 className="news__cards-header">Search results</h2>
      <div className="news__cards-container">
      {articles.slice(0, visibleArticles).map((article, index) => (
        <NewsCard
          key={index} // You can use article.url if it's available and unique
          source={article.source.name}
          title={article.title}
          publishedAt={new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          description={article.description}
          keyword={article.keyword} 
          urlToImage={article.urlToImage} // Use the correct prop for the image
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          url={article.url}
        />
        
      ))}
      </div>
      {visibleArticles < articles.length && (
      <button className="news__cards-button"
      onClick={handleShowMore}>
        Show more
        </button>
      )}
    </div>
  );
};

export default NewsCardsList;