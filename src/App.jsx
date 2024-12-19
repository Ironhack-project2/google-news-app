import React, { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import Footer from "./components/ui/footer.jsx";
import Header from "./components/ui/header.jsx";
import Sidebar from "./components/ui/sidebar.jsx";
import LanguageSearch from "./components/filters/language-search.jsx";
import CountrySearch from "./components/filters/country-search.jsx";
import NewsList from "./components/news-list.jsx";

function App() {
  const [language, setLanguage] = useState("es");
  const [country, setCountry] = useState("es");
  const [keyword, setKeyword] = useState("");
  const [selectedOutlets, setSelectedOutlets] = useState([]);
  const [availableOutlets, setAvailableOutlets] = useState([]);


  
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header setKeyword={setKeyword} />
      <div className="container-fluid flex-grow-1">
        <div className="row">
          <div className="col-3 bg-light">
            <Sidebar
              setSelectedOutlets={setSelectedOutlets}
              availableOutlets={availableOutlets}
              setAvailableOutlets={setAvailableOutlets}
              country={country}
              language={language}
            />
          </div>
          <div className="col p-4">
            <div className="filters">
              <LanguageSearch setLanguage={setLanguage} />
              <CountrySearch setCountry={setCountry} />
            </div>
            <NewsList
              query={keyword}
              language={language}
              country={country}
              outlets={selectedOutlets}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;