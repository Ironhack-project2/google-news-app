import React from "react";
import KeywordSearch from "../filters/keyword-search.jsx";

function Header({ setKeyword }) {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand">Google News App</a>
        <KeywordSearch setKeyword={setKeyword} />
      </div>
    </nav>
  );
}

export default Header;