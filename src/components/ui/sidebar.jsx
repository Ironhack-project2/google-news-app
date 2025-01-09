// src/components/ui/sidebar.jsx
import React, { useState, useMemo } from "react";
import SourceFilter from "../filters/source-filter";

const Sidebar = ({ sources, setSelectedSource }) => {
  const [isHovered, setIsHovered] = useState(false);

  const excludedNames = ["[Removed]"];

  const sortedFilteredSources = useMemo(() => {
    if (!sources) return [];

    let filteredSources = sources.filter((src) => {
      if (typeof src === "object" && src !== null && "name" in src) {
        return !excludedNames.includes(src.name);
      }
      if (typeof src === "string") {
        return !excludedNames.includes(src);
      }
      return true;
    });

    if (filteredSources.length === 0) return [];

    // Si el primer elemento es un objeto con 'name'
    if (
      typeof filteredSources[0] === "object" &&
      filteredSources[0] !== null &&
      "name" in filteredSources[0]
    ) {
      return filteredSources.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );
    }

    // Si son strings, los ordenamos
    if (typeof filteredSources[0] === "string") {
      return filteredSources.sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: "base" })
      );
    }

    return filteredSources;
  }, [sources, excludedNames]);

  return (
    <div
      className={`p-3 rounded ${
        isHovered ? "bg-secondary bg-opacity-75" : "bg-light bg-opacity-75"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transition: "background-color 0.3s ease" }}
    >
      <SourceFilter
        availableOutlets={sortedFilteredSources}
        setSelectedSource={setSelectedSource}
      />
    </div>
  );
};

export default Sidebar;