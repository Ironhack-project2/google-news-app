import React from "react";
import KeywordSearch from "../filters/keyword-search.jsx";
import LanguageSearch from "../filters/language-search.jsx";

const Header = ({ keyword, setKeyword, setLanguage, language, resetSearch }) => {
  const handleTitleClick = () => {
    resetSearch();
  };

  return (
    <header className="bg-light bg-opacity-75 shadow-sm py-3 mb-4">
      {/* container para centrar el contenido */}
      <div className="container">
        {/* row para dividir el espacio en columnas */}
        <div className="row align-items-center">
          
          {/* Columna para el título */}
          <div className="col">
            <h1
              className="display-4 text-primary fw-bold m-0"
              style={{ cursor: "pointer" }}
              onClick={handleTitleClick}
            >
              Google News App
            </h1>
          </div>
          
          {/* Columna autoajustada para la búsqueda e idioma */}
          <div className="col-auto d-flex align-items-center gap-3">
            <div className="p-2">
              <KeywordSearch setKeyword={setKeyword} keyword={keyword} />
            </div>
            <LanguageSearch currentLanguage={language} setLanguage={setLanguage} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;