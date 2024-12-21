import React from "react";
import KeywordSearch from "../filters/keyword-search.jsx";
import LanguageSearch from "../filters/language-search.jsx"; 

const Header = ({ keyword, setKeyword, setLanguage, language }) => {

  const handleTitleClick = () => {
    window.location.reload();
  };

  return (
    <header className="bg-primary text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 
          className="h3 mb-0" 
          onClick={handleTitleClick} 
          style={{ cursor: 'pointer' }}
        >
          Google News App
        </h1>
        <div className="d-flex align-items-center">
          <KeywordSearch setKeyword={setKeyword} keyword={keyword} />
          <LanguageSearch setLanguage={setLanguage} language={language} />
        </div>
      </div>
    </header>
  );
};

export default Header;