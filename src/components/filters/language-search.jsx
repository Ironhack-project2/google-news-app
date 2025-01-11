import React from "react";
import Select from "react-select";

const languages = [
  { value: "en", label: "Inglés" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Francés" },
];

const LanguageSearch = ({ setLanguage, currentLanguage }) => {
  const selectedOption =
    languages.find((lang) => lang.value === currentLanguage) || languages[0];

  const handleChange = (selectedOption) => {
    setLanguage(selectedOption.value);
  };

  return (
    <div className="ms-2 p-2">
      <div className="form-label mb-1">Seleccionar Idioma:</div>
      <Select
        value={selectedOption}
        options={languages}
        onChange={handleChange}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "#F8F9FA",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }),
        }}
      />
    </div>
  );
};

export default LanguageSearch;