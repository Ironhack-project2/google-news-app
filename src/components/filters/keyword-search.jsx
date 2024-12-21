import React, { useState, useEffect } from "react";

const KeywordSearch = ({ setKeyword, keyword }) => {
  const [input, setInput] = useState(keyword);

  useEffect(() => {
    setInput(keyword);
  }, [keyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    setKeyword(trimmedInput);
  };

  const clearSearch = () => {
    setInput("");
    setKeyword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        {/* Campo de Entrada */}
        <input
          type="text"
          className="form-control"
          placeholder="Buscar palabras clave..."
          aria-label="Buscar palabras clave"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* Botón "Buscar" */}
        <button
          className="btn btn-success btn-sm rounded-pill"
          type="submit"
          disabled={!input.trim()}
          title="Buscar"
          aria-label="Buscar noticias"
        >
          <span className="ms-2 d-none d-md-inline">Buscar</span>
        </button>

        {/* Botón "Limpiar" */}
        <button
          type="button"
          className="btn btn-danger btn-sm rounded-pill ms-2"
          onClick={clearSearch}
          disabled={!input.trim()}
          title="Limpiar búsqueda"
          aria-label="Limpiar búsqueda"
        >
          <span className="ms-2 d-none d-md-inline">Limpiar</span>
        </button>
      </div>
    </form>
  );
};

export default KeywordSearch;