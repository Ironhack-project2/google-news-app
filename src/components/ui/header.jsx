import React, { useMemo } from "react";
import KeywordSearch from "../filters/keyword-search.jsx";
import LanguageSearch from "../filters/language-search.jsx"; 

const Header = ({ articles = [], keyword, setKeyword, setLanguage }) => {
  const filteredData = useMemo(() => {
    if (!keyword) return articles;
    return articles.filter((item) =>
      item.title.toLowerCase().includes(keyword.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(keyword.toLowerCase()))
    );
  }, [keyword, articles]);

  const handleKeywordChange = (newKeyword) => {
    setKeyword(newKeyword);
  };

  const handleTitleClick = () => {
    window.location.reload();
  };

  return (
    <header className="bg-primary text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h3 mb-0" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
          Google News App
        </h1>
        <div className="d-flex align-items-center">
          <KeywordSearch setKeyword={handleKeywordChange} />
          <LanguageSearch setLanguage={setLanguage} />
        </div>
      </div>
      <div className="container mt-3">
        {filteredData.length > 0 ? (
          <ul className="list-group">
            {filteredData.map((item) => (
              <li key={item.title} className="list-group-item">
                <h5>{item.title}</h5>
                <p>{item.description || "Sin descripción disponible."}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
