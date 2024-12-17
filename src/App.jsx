import React, { useState } from "react";
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
  const [selectedSource, setSelectedSource] = useState(""); 
  const [selectedOutlets, setSelectedOutlets] = useState([]); // Salidas seleccionadas visualmente

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header setKeyword={setKeyword} />

      <div className="container-fluid flex-grow-1">
        <div className="row">
          {/* Sidebar con filtros de fuentes */}
          <div className="col-3 bg-light">
            <Sidebar
              setSelectedOutlets={setSelectedOutlets}
              country={country}
              language={language}
              setSelectedSource={setSelectedSource}
            />
          </div>

          {/* Contenido principal: Filtros y Lista de Noticias */}
          <div className="col p-4">
            {/* Filtros adicionales: Idioma y País ---- Pendiente de mejora */}
            <div className="filters mb-3 d-flex gap-3">
              <LanguageSearch setLanguage={setLanguage} />
              <CountrySearch setCountry={setCountry} />
            </div>

            {/* Lista de noticias filtrada ---- No funciona bien aún */}
            <NewsList
              query={keyword}          
              language={language}      
              country={country}        
              source={selectedSource}  
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;