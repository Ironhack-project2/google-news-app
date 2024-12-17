import React, { useState } from "react";

const KeywordSearch = ({ setKeyword }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setKeyword(input.trim());
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control me-2"
        placeholder="Buscar palabras clave..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="Buscar palabras clave"
      />
      <button className="btn btn-outline-success" type="submit">
        Buscar
      </button>
    </form>
  );
};

export default KeywordSearch;