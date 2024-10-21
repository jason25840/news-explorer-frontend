import '../styles/SavedNewsHeader.css';

const SavedNewsHeader = ({ currentUser, articleCount, keywords = [] }) => {

    return ( 
        <section className="saved-news-header">
            <p className="saved-news-header__title">Saved articles</p>
            <h1 className="saved-news-header__user-info">
            {`${currentUser?.name || 'User'}, you have ${articleCount} saved article${
            articleCount !== 1 ? 's' : ''}`}
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

