import React from "react";
import SourceFilter from "../filters/source-filter.jsx";

const Sidebar = ({ setSelectedOutlets, availableOutlets, setAvailableOutlets, country, language }) => {
  return (
    <SourceFilter
      setAvailableOutlets={setAvailableOutlets}
      availableOutlets={availableOutlets}
      country={country}
      language={language}
      setSelectedOutlets={setSelectedOutlets}
    />
  );
};

export default Sidebar;