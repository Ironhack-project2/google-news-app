import React, { useState } from "react";
import Footer from "./components/ui/footer.jsx";
import Header from "./components/ui/header.jsx";
import LanguageSearch from "./components/filters/language-search.jsx";
import CountrySearch from "./components/filters/country-search.jsx";
import NewsList from "./components/news-list.jsx";

function App() {
  const [language, setLanguage] = useState("es"); 
  const [country, setCountry] = useState("es");   
  const [keyword, setKeyword] = useState("");   
  const [selectedSource, setSelectedSource] = useState(""); 

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header con búsqueda por palabras clave */}
      <Header setKeyword={setKeyword} />

      <div className="container-fluid flex-grow-1">
        <div className="row">
          {/* Contenido principal */}
          <div className="col p-4">
            {/* Filtros: Idioma y País */}
            <div className="filters mb-3 d-flex gap-3">
              <LanguageSearch setLanguage={setLanguage} />
              <CountrySearch setCountry={setCountry} />
            </div>

            {/* Lista de Noticias */}
            <NewsList
              query={keyword}          // Palabras clave para la búsqueda
              language={language}      // Idioma seleccionado
              country={country}        // País seleccionado
              source={selectedSource}  // Fuente seleccionada
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;