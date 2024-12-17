import React from "react";

const languages = [
  { code: "en", label: "Inglés" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Francés" },
];

const LanguageSearch = ({ setLanguage }) => {
  return (
    <div className="filter-item mb-3">
      <label htmlFor="language" className="form-label">
        Seleccionar Idioma:
      </label>
      <select
        id="language"
        className="form-select"
        onChange={(e) => setLanguage(e.target.value)}
        defaultValue="es"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSearch;