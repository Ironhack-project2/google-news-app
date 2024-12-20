import React from "react";

const SourceFilter = ({ availableOutlets = [], setSelectedSource }) => {
  if (!Array.isArray(availableOutlets)) {
    return <p className="text-danger">Error al cargar las fuentes.</p>;
  }

  const handleSelection = (source) => {
    setSelectedSource(source.id);
  };

  const OutletButton = ({ outlet }) => (
    <button
      className="list-group-item list-group-item-action"
      onClick={() => handleSelection(outlet)}
    >
      <strong>{outlet.name}</strong>
    </button>
  );

  return (
    <div className="list-group">
      <h5 className="mb-3">Medios Disponibles</h5>
      {availableOutlets.length > 0 ? (
        availableOutlets.map((outlet) => (
          <div key={outlet.id || outlet.name} className="mb-2">
            <OutletButton outlet={outlet} />
          </div>
        ))
      ) : (
        <p className="text-muted">No hay medios disponibles.</p>
      )}
    </div>
  );
};

export default SourceFilter;