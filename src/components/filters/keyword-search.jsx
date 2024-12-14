import React, { useState } from "react";

const KeywordSearch = ({ setKeyword }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(searchTerm);
  };

  return (
    <form className="d-flex" role="search" onSubmit={handleSearch}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};

export default KeywordSearch;