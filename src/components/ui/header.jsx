import React from "react";
import KeywordSearch from "../filters/keyword-search.jsx";

const Header = ({ setKeyword }) => {
  return (
    <header className="bg-primary text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h3">Google News App</h1>
        <KeywordSearch setKeyword={setKeyword} />
      </div>
    </header>
  );
};

export default Header;