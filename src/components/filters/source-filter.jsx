import React from "react";

const SourceFilter = ({ availableOutlets, setSelectedSource }) => {
  if (!Array.isArray(availableOutlets) || availableOutlets.length === 0) {
    return <p className="text-muted">No hay fuentes disponibles.</p>;
  }

  const handleSelection = (source) => {
    setSelectedSource(source);
  };

  return (
    <div className="list-group">
      <h5 className="mb-3 fw-bold text-dark">Medios Disponibles</h5>
      {availableOutlets.map((outlet) => (
        <button
          key={typeof outlet === "object" ? outlet.id : outlet}
          className="list-group-item list-group-item-action border-0 py-2"
          style={{
            borderBottom: "1px solid #e0e0e0", 
            transition: "background-color 0.2s ease", 
          }}
          onClick={() =>
            handleSelection(typeof outlet === "object" ? outlet.id : outlet)
          }
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "#f8f9fa") 
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "transparent") 
          }
        >
          <strong>{typeof outlet === "object" ? outlet.name : outlet}</strong>
        </button>
      ))}
    </div>
  );
};

export default SourceFilter;