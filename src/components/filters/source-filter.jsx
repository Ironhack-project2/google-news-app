import React from "react";

const SourceFilter = ({ availableOutlets = [], setSelectedSource }) => {
  if (!Array.isArray(availableOutlets)) {
    console.error("availableOutlets debe ser un array");
    return <p className="text-danger">Error cargando las fuentes.</p>;
  }

  const handleSelection = (source) => {
    setSelectedSource(source.id);
  };

  return (
    <div className="list-group">
      <h5 className="mb-3">Medios Disponibles</h5>
      {availableOutlets.length > 0 ? (
        availableOutlets.map((outlet, index) => (
          <div key={index} className="mb-2">
            <button
              className="list-group-item list-group-item-action"
              onClick={() => handleSelection(outlet)}
            >
              <strong>{outlet.name}</strong>
            </button>
          </div>
        ))
      ) : (
        <p className="text-muted">No hay medios disponibles.</p>
      )}
    </div>
  );
};

export default SourceFilter;