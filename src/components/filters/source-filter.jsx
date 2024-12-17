import React, { useEffect, useState } from "react";
import axios from "axios";

const SourceFilter = ({ country, language, setSelectedOutlets, setSelectedSource }) => {
  const [availableOutlets, setAvailableOutlets] = useState([]);
  const [error, setError] = useState(null);

  const NEWSDATAHUB_API_KEY = "k_Bd2ILMACOlVls6Ss6_wdQwq3Y5M-B0dhW6fMmgdlI";
  const NEWSAPI_API_KEY = "64ca2eb893b045fca825eeed4246c55f";

  // Conexión con NewsDataHub API
  const fetchNewsDataHubSources = async () => {
    try {
      const response = await axios.get("https://api.newsdatahub.com/v1/news", {
        headers: { "X-Api-Key": NEWSDATAHUB_API_KEY },
        params: { country, language },
      });

      return (
        response.data?.data?.map((item) => ({
          name: item.source_title || "Fuente desconocida",
          id: item.source_title, // Uso el name como ID
        })) || []
      );
    } catch (error) {
      console.error("Error fetching NewsDataHub sources:", error);
      return [];
    }
  };

  // Conexión con NewsAPI
  const fetchNewsApiSources = async () => {
    try {
      const response = await axios.get("https://newsapi.org/v2/top-headlines/sources", {
        params: {
          apiKey: NEWSAPI_API_KEY,
          language,
          country,
        },
      });

      return (
        response.data?.sources?.map((source) => ({
          name: source.name,
          id: source.id, 
        })) || []
      );
    } catch (error) {
      console.error("Error fetching NewsAPI sources:", error);
      return [];
    }
  };

  // Resultados combinados
  const fetchAllSources = async () => {
    setError(null);
    try {
      const [newsDataHubSources, newsApiSources] = await Promise.all([
        fetchNewsDataHubSources(),
        fetchNewsApiSources(),
      ]);

      // Eliminar duplicados usando como referencia 'name'
      const combinedSources = Array.from(
        new Map(
          [...newsDataHubSources, ...newsApiSources].map((source) => [source.name, source])
        ).values()
      );

      setAvailableOutlets(combinedSources);
    } catch (err) {
      setError("Error al cargar las fuentes. Inténtalo de nuevo más tarde.");
      setAvailableOutlets([]);
    }
  };

  useEffect(() => {
    fetchAllSources();
  }, [country, language]);

  // Manejador para la selección de fuentes
  const handleSelection = (outlet) => {
    // Actualiza las salidas seleccionadas para el estado local
    setSelectedOutlets((prev) =>
      prev.includes(outlet.name)
        ? prev.filter((item) => item !== outlet.name)
        : [...prev, outlet.name]
    );

    // Envía la fuente seleccionada al componente padre
    setSelectedSource(outlet.id);
  };

  return (
    <div className="list-group">
      <h5 className="mb-3">Medios Disponibles</h5>
      {error && <p className="text-danger">{error}</p>}
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