import React, { useState, useEffect } from "react";
import "animate.css"; 
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
    <form
      onSubmit={handleSubmit}
      className="p-3 shadow rounded animate__animated animate__fadeIn"
      style={{
        backgroundColor: "#F8F9FA",
      }}
    >
      <div className="input-group d-flex justify-content-center align-items-center gap-3">
        {/* Campo de Entrada */}
        <input
          type="text"
          className="form-control shadow-sm rounded-pill"
          placeholder="Buscar palabras clave..."
          aria-label="Buscar palabras clave"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            maxWidth: "500px",
          }}
        />
        {/* Botón "Buscar" */}
        <button
          className="btn btn-success btn-sm rounded-pill ms-1 shadow animate__animated animate__fadeInDown"
          type="submit"
          disabled={!input.trim()}
          title="Buscar"
          aria-label="Buscar noticias"
        >
          {/* Si deseas agregar un icono personalizado, puedes hacerlo aquí */}
          <span className="ms-2 d-none d-md-inline">Buscar</span>
        </button>
        {/* Botón "Limpiar" */}
        <button
          type="button"
          className="btn btn-danger btn-sm rounded-pill ms-1 shadow animate__animated animate__fadeInDown"
          onClick={clearSearch}
          disabled={!input.trim()}
          title="Limpiar búsqueda"
          aria-label="Limpiar búsqueda"
        >
          {/* Si deseas agregar un icono personalizado, puedes hacerlo aquí */}
          <span className="ms-2 d-none d-md-inline">Limpiar</span>
        </button>
      </div>
    </form>
  );
};
export default KeywordSearch;