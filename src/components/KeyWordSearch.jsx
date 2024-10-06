import { KeywordContext } from '../contexts/keywordContext';
import '../styles/KeyWordSearch.css';
import { useState, useContext } from "react";


const KeywordSearch = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');
    const { setKeyword } = useContext(KeywordContext);  // Added for search functionality
  
    const handleSearch = (e) => {
      e.preventDefault();
      setKeyword(inputValue);
      onSearch(inputValue);  
    };
  
    return (
      <form onSubmit={handleSearch} className="keyword__search-form">
      <input
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter topic"
          className="keyword__search-input" 
      />
      <button type="submit" className="keyword__search-button">Search</button> 
      </form>
    );
  };

  export default KeywordSearch;