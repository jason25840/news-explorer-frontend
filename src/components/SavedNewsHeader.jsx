import { fetchSavedArticlesForUser } from '../mockData/SavedArticles';
import '../styles/SavedNewsHeader.css';

const SavedNewsHeader = ({ currentUser }) => {
    console.log("Current User:", currentUser);
    const savedArticles = currentUser ? fetchSavedArticlesForUser(currentUser.email) : [];
    const keywords = [...new Set(savedArticles.map(article => article.keyword).filter(Boolean))];

    return ( 
        <section className="saved-news-header">
            <p className="saved-news-header__title">Saved articles</p>
            <h1 className="saved-news-header__user-info">
                {currentUser?.userName || "User"}, you have {savedArticles.length} saved article{savedArticles.length !== 1 ? 's' : ''}
            </h1>
            {keywords.length > 0 && (
                <div className="saved-news-header__keywords">
                    <span className="saved-news-header__keywords-title">By Keywords:</span>
                    <span className="saved-news-header__keywords-list">
                        {keywords.slice(0, 3).join(', ')}{keywords.length > 3 ? `, and ${keywords.length - 3} others...` : ''}
                    </span>
                </div>
            )}
        </section>
    );
};
 
export default SavedNewsHeader;

/*import { fetchSavedArticlesForUser } from '../mockData/SavedArticles';
import '../styles/SavedNewsHeader.css';

const SavedNewsHeader = ({
    currentUser
}) => {
    console.log("Current User:", currentUser);
    const savedArticles = currentUser ? fetchSavedArticlesForUser(currentUser.email) : [];

    const keywords = [...new Set(savedArticles.map(article => article.keyword).filter(Boolean))];

    return ( 
        <div className="saved-news__content">
            <p className="saved-news__title">Saved articles</p>
        <h1 className="saved-news__user-info">
            {currentUser?.userName || "User"}, you have {savedArticles.length} saved article{savedArticles.length !== 1 ? 's' : ''}
        </h1>
        {keywords.length > 0 && (
        <h2 className="saved-news__keywords-container">
            <span className="saved-news__keywords-title">By Keywords:</span>
            <span className="saved-news__keywords">
            {keywords.slice(0, 3).join(', ')}{keywords.length > 3 ? `, and ${keywords.length - 3} others...` : ''}
            </span>
        </h2>
        )}
        </div>
     );
};
 
export default SavedNewsHeader;*/