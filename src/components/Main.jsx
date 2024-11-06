import "../styles/Main.css";

import Preloader from "./Preloader";
import NothingFound from "./NothingFound";
import KeyWordSearch from "./KeyWordSearch";
import NewsCardsList from "./NewsCardsList";

const Main = ({
  onSearch,
  articles,
  loading,
  error,
  isLoggedIn,
  hasSearched,
}) => {
  return (
    <>
      <main className="main">
        <div className="main__content">
          <h1 className="main__header">What's going on in the world?</h1>
          <p className="main__description">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
        </div>
        <KeyWordSearch onSearch={onSearch} />
      </main>
      {loading ? (
        <Preloader />
      ) : hasSearched && (error || articles.length > 0) ? (
        error ? (
          <div className="main__error-message">{error.message}</div>
        ) : (
          <NewsCardsList articles={articles} isLoggedIn={isLoggedIn} />
        )
      ) : hasSearched && articles.length === 0 && !loading ? (
        <NothingFound />
      ) : null}
    </>
  );
};

export default Main;
