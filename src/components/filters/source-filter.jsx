import React, { useEffect } from "react";
import axios from "axios";

const SourceFilter = ({ setAvailableOutlets, availableOutlets, country, language, setSelectedOutlets }) => {
  const API_KEY = 'k_Bd2ILMACOlVls6Ss6_wdQwq3Y5M-B0dhW6fMmgdlI';

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await axios.get('https://api.newsdatahub.com/v1/news', {
          headers: { 'X-Api-Key': API_KEY },
          params: { country, language },
        });

        if (response.data && response.data.data) {
          const sources = [...new Set(response.data.data.map((item) => item.source_title))];
          setAvailableOutlets(sources.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching sources:", error);
      }
    };

    fetchSources();
  }, [country, language, setAvailableOutlets]);

  const handleSelection = (outlet) => {
    setSelectedOutlets((prev) => {
      if (prev.includes(outlet)) {
        return prev.filter((item) => item !== outlet);
      } else {
        return [...prev, outlet];
      }
    });
  };

  return (
    <div className="list-group">
      <h5 className="mb-3">Medios Disponibles</h5>
      {availableOutlets.map((outlet, index) => (
        <button
          key={index}
          className="list-group-item list-group-item-action"
          onClick={() => handleSelection(outlet)}
        >
          {outlet}
        </button>
      ))}
    </div>
  );
};

export default SourceFilter;