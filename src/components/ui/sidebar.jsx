import React from "react";
import SourceFilter from "../filters/source-filter.jsx";

const Sidebar = ({ setSelectedOutlets, country, language, setSelectedSource }) => {
  return (
    <div className="p-3">
      <SourceFilter
        country={country}
        language={language}
        setSelectedOutlets={setSelectedOutlets}
        setSelectedSource={setSelectedSource}
      />
    </div>
  );
};

export default Sidebar;