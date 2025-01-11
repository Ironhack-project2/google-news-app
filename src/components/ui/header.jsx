import React from "react";
import KeywordSearch from "../filters/keyword-search.jsx";
import LanguageSearch from "../filters/language-search.jsx";

const Header = ({ keyword, setKeyword, setLanguage, language, resetSearch }) => {
  const handleTitleClick = () => {
    resetSearch();
  };

  return (
    <header className="bg-light bg-opacity-75 shadow-sm p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1
          className="h1 text-primary fw-bold m-0"
          style={{ fontSize: "2rem", cursor: "pointer" }}
          onClick={handleTitleClick}
        >
          Google News App
        </h1>
        <div className="d-flex justify-content-center align-items-center gap-3">
          <div className="p-3 rounded">
            <KeywordSearch setKeyword={setKeyword} keyword={keyword} />
          </div>
          <LanguageSearch currentLanguage={language} setLanguage={setLanguage} />
        </div>
      </div>
    </header>
  );  
};

export default Header;