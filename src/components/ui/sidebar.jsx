import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import SourceFilter from "../filters/source-filter";

const EXCLUDED_NAMES = ["[Removed]"];

const Sidebar = ({ sources, setSelectedSource }) => {
  const [isHovered, setIsHovered] = useState(false);

  const sortedFilteredSources = useMemo(() => {
    if (!Array.isArray(sources)) {
      console.warn("El prop 'sources' no es un array:", sources);
      return [];
    }

    const filteredSources = sources.filter((src) => {
      if (typeof src === "object" && src !== null && "name" in src) {
        return !EXCLUDED_NAMES.includes(src.name);
      }
      if (typeof src === "string") {
        return !EXCLUDED_NAMES.includes(src);
      }
      return true;
    });

    if (filteredSources.length === 0) return [];

    const sourcesCopy = [...filteredSources];

    // Ordenar por nombre
    if (
      typeof sourcesCopy[0] === "object" &&
      sourcesCopy[0] !== null &&
      "name" in sourcesCopy[0]
    ) {
      sourcesCopy.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );
    } else if (typeof sourcesCopy[0] === "string") {
      sourcesCopy.sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: "base" })
      );
    } else {
      console.warn("Formato inesperado en 'sourcesCopy':", sourcesCopy);
    }

    return sourcesCopy;
  }, [sources]);

  // Solo para debug
  useMemo(() => {
    console.log("sortedFilteredSources:", sortedFilteredSources);
  }, [sortedFilteredSources]);

  return (
    <div
      className={`p-3 rounded ${
        isHovered ? "bg-secondary bg-opacity-75" : "bg-light bg-opacity-75"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: "background-color 0.3s ease",
        maxHeight: "calc(100vh - 150px)",
        overflowY: "auto",
        borderRight: "1px solid #ddd",
      }}
    >
      <SourceFilter
        availableOutlets={sortedFilteredSources}
        setSelectedSource={setSelectedSource}
      />
    </div>
  );
};

Sidebar.propTypes = {
  sources: PropTypes.array.isRequired,
  setSelectedSource: PropTypes.func.isRequired,
};

export default Sidebar;