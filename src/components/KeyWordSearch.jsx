import { KeywordContext } from '../contexts/keywordContext';
import '../styles/KeyWordSearch.css';
import { useState, useContext } from "react";

const KeywordSearch = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');
    const { setKeyword } = useContext(KeywordContext);  

    const handleSearch = (e) => {
        e.preventDefault();
        setKeyword(inputValue);
        onSearch(inputValue);  
    };

    return (
        <form onSubmit={handleSearch} className="keyword-search__form">
            <input
                type="search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter topic"
                className="keyword-search__input" 
            />
            <button type="submit" className="keyword-search__button">Search</button> 
        </form>
    );
};

export default KeywordSearch;

