import React from "react";

const CountrySearch = ({ setCountry }) => {
  return (
    <div className="filter-item">
      <label htmlFor="country">País:</label>
      <select
        id="country"
        className="form-select"
        onChange={(e) => setCountry(e.target.value)}
        defaultValue="es"
      >
        <option value="us">Estados Unidos</option>
        <option value="fr">Francia</option>
        <option value="es">España</option>
      </select>
    </div>
  );
};

export default CountrySearch;