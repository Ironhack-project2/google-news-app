import React from "react";

const SourceFilter = ({ availableOutlets, setSelectedSource }) => {
  if (!Array.isArray(availableOutlets) || availableOutlets.length === 0) {
    return <p className="text-muted">No hay fuentes disponibles.</p>;
  }

  const handleSelection = (source) => {
    const encoded = encodeURIComponent(source);
    setSelectedSource(encoded);
  };

  return (
    <div className="list-group">
      <h5 className="mb-3 fw-bold text-dark">Medios Disponibles</h5>
      {availableOutlets.map((outlet) => {
        const label = typeof outlet === "object" ? outlet.name : outlet;
        const value = typeof outlet === "object" ? outlet.id : outlet;

        return (
          <button
            key={value}
            className="list-group-item list-group-item-action list-group-item-light mb-2 border-0"
            onClick={() => handleSelection(value)}
          >
            <strong>{label}</strong>
          </button>
        );
      })}
    </div>
  );
};

export default SourceFilter;