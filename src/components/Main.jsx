import React, { useState } from 'react';
import Preloader from './Preloader';
import NothingFound from './NothingFound';
import KeywordSearch from "./KeyWordSearch";
import '../styles/Main.css';

const Main = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    
    const handleSearch = (keyword) => {
      setLoading(true); // Start preloader
      // Simulate API request with setTimeout (replace with actual fetch call)
      setTimeout(() => {
        if (keyword === "found") {
          setData({ result: "Some result data" });
        } else {
          setData(null); // No data found
        }
        setLoading(false); // Stop preloader
      }, 2000); // Simulating delay
    };
   // Fetch news data based on the keyword and update the state
    return ( 
        <div className="main-page__content">
            <h1 className="main-page__header">What's going on in the world?</h1>
                <p className="main-page__description">Find the latest news on any topic and save them in your personal account.</p>
                {/* Search bar */}
            <KeywordSearch onSearch={handleSearch} />

                {/* Conditionally show Preloader or content */}
                {loading ? (
            <Preloader />
            ) : data ? (
                <div className="results">Here are the results: {data.result}</div>
            ) : (
                <NothingFound />
            )}
        </div>
     );
}
 
export default Main;