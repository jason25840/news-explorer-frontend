import '../styles/KeyWordSearch.css';
import { useState } from "react";

const KeywordSearch = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');
  
    const handleSearch = (e) => {
      e.preventDefault();
      onSearch(keyword);  
    };
  
    return (
      <form onSubmit={handleSearch} className="keyword-search-form">
      <input
          type="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter topic"
          className="keyword-search-input" 
      />
      <button type="submit" className="search-button">Search</button> 
      </form>
    );
  };

  export default KeywordSearch;