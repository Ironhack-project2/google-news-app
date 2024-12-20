import React, { useState } from "react";
import Footer from "./components/ui/footer.jsx";
import Header from "./components/ui/header.jsx";
import NewsList from "./components/news-list.jsx";

function App() {
  const [language, setLanguage] = useState("es");
  const [country, setCountry] = useState("es");
  const [keyword, setKeyword] = useState("");
  const [selectedSource, setSelectedSource] = useState("");

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header setKeyword={setKeyword} keyword={keyword} setLanguage={setLanguage} />
      <div className="container-fluid flex-grow-1">
        <div className="row">
          <div className="col p-4">
            <NewsList
              query={keyword}
              language={language}
              country={country}
              source={selectedSource}
              max={20}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;