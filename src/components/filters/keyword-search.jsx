import React, { useState } from "react";

const KeywordSearch = ({ setKeyword }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setKeyword(input.trim());
  };
  
  const clearSearch = () => {
    setInput("");
    setKeyword("");
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Buscar palabras clave..."
        aria-label="Buscar palabras clave"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="btn btn-outline-success" type="submit">
        Buscar
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary ms-2"
        onClick={clearSearch}
      >
        Limpiar
      </button>
    </form>
  );
};

export default KeywordSearch;