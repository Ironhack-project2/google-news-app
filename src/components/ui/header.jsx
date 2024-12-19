import React, { useState } from "react";
import KeywordSearch from "../filters/keyword-search.jsx";

const Header = ({ articles }) => {
  const [keyword, setKeyword] = useState("");
  const [filteredData, setFilteredData] = useState(articles || []);

  // Filtrar artículos en tiempo real según la palabra clave
  const filterArticles = (keyword) => {
    const results = articles.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(keyword.toLowerCase()))
    );
    setFilteredData(results);
  };

  // Manejar cambios en la palabra clave
  const handleKeywordChange = (newKeyword) => {
    setKeyword(newKeyword);
    filterArticles(newKeyword);
  };

  return (
    <header className="bg-primary text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h3">Google News App</h1>
        <KeywordSearch setKeyword={handleKeywordChange} />
      </div>
      <div className="container mt-3">
        {filteredData.length > 0 ? (
          <ul className="list-group">
            {filteredData.map((item, index) => (
              <li key={index} className="list-group-item">
                <h5>{item.title}</h5>
                <p>{item.description || "Sin descripción disponible."}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </header>
  );
};

export default Header;