import { createContext, useState } from 'react';

// Create the context
export const KeywordContext = createContext();

// Create a provider component
export const KeywordProvider = ({ children }) => {
  const [keyword, setKeyword] = useState('');

  return (
    <KeywordContext.Provider value={{ keyword, setKeyword }}>
      {children}
    </KeywordContext.Provider>
  );
};