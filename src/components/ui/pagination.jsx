import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];

  // Definir un rango de páginas a mostrar
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Manejar clic en página específica
  const handleClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  // Manejar clic en "Anterior"
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Manejar clic en "Siguiente"
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={handlePrev}>
            Anterior
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
            <button className="page-link" onClick={() => handleClick(number)}>
              {number}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={handleNext}>
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;