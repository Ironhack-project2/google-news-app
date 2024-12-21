// language-search.jsx
import React, { useState } from "react";

const languages = [
  { code: "en", label: "Inglés" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Francés" },
];

const LanguageSearch = ({ setLanguage }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleChange = (code) => {
    setSelectedLanguage(code);
    setLanguage(code);
  };

  return (
    <div className="ms-2">
      <div className="form-label mb-0 me-2">Seleccionar Idioma:</div>
      <div className="d-flex gap-3">
        {languages.map((lang) => (
          <div key={lang.code} className="form-check">
            <input
              type="radio" 
              className="form-check-input"
              id={`lang-${lang.code}`}
              name="language" 
              value={lang.code}
              checked={selectedLanguage === lang.code}
              onChange={() => handleChange(lang.code)}
            />
            <label className="form-check-label" htmlFor={`lang-${lang.code}`}>
              {lang.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSearch;