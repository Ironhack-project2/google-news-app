import React from "react";

const LanguageSearch = ({ setLanguage }) => {
  return (
    <div className="filter-item">
      <label htmlFor="language">Idioma:</label>
      <select
        id="language"
        className="form-select"
        onChange={(e) => setLanguage(e.target.value)}
        defaultValue="es"
      >
        <option value="en">Inglés</option>
        <option value="es">Español</option>
        <option value="fr">Francés</option>
      </select>
    </div>
  );
};

export default LanguageSearch;