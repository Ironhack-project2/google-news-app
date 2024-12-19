import React from "react";
import SourceFilter from "../filters/source-filter";

const Sidebar = ({ sources, setSelectedSource }) => {
  return (
    <div className="sidebar bg-light p-3">
      <SourceFilter
        availableOutlets={sources || []}
        setSelectedSource={setSelectedSource}
      />
    </div>
  );
};

export default Sidebar;