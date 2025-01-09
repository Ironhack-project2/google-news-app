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
          style={{
            cursor: 'pointer',
            fontFamily:  'Poppins, sans-serif',
            fontSize: '3 rem',
            fontWeight: '600',
           }}
        >
          Google News App
        </h1>
        <div className="d-flex justify-content-center align-items-center gap-3">
        <div className="p-3 rounded">
          <KeywordSearch setKeyword={setKeyword} keyword={keyword} />
          </div>
          <div className="d-flex justify-content-center align-items-center gap-3"></div>
          <LanguageSearch currentLanguage={language} setLanguage={setLanguage} />
        </div>
      </div>
    </header>
  );
};

export default Header;