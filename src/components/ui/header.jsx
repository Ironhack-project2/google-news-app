import React, { useState, useEffect } from "react";
import axios from "axios";
import KeywordSearch from "../filters/keyword-search";

function Header() {
  const [keyword, setKeyword] = useState(""); 
  const [Data, setData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 

  // API call to fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // API call
        const response = await axios.get("https://api.newsdatahub.com/v1/news");

        
        const newsData = response.data.data;

        console.log("Data:", newsData); 

        setData(newsData); 
        setFilteredData(newsData); 
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);

 
  useEffect(() => {
    const results = Data.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword.toLowerCase()) ||
        item.description.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredData(results);
  }, [keyword, Data]);

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand">Google News App</a>
        <KeywordSearch setKeyword={setKeyword} /> 

        <div className="mt-3">
          {filteredData.length > 0 ? (
            <ul className="list-group">
              {filteredData.map((item, index) => (
                <li key={index} className="list-group-item">
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;

