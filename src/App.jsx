import React from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "./components/ui/footer.jsx";
import Header from "./components/ui/header.jsx";
import NewsList from "./components/news-list.jsx";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extraemos los parámetros de búsqueda de la URL o usamos valores por defecto
  const language = searchParams.get("language") || "en";
  const keyword = searchParams.get("query") || "";
  const selectedSource = searchParams.get("source") || "";
  const max = parseInt(searchParams.get("max")) || 20;

  // Función para actualizar los parámetros de búsqueda
  const updateSearchParams = (newParams) => {
    const updatedParams = new URLSearchParams(searchParams);
    Object.keys(newParams).forEach((key) => {
      if (newParams[key]) {
        updatedParams.set(key, newParams[key]);
      } else {
        updatedParams.delete(key);
      }
    });
    setSearchParams(updatedParams);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        keyword={keyword}
        setKeyword={(kw) => updateSearchParams({ query: kw })}
        language={language}
        setLanguage={(lang) => updateSearchParams({ language: lang })}
      />
      <div className="container-fluid flex-grow-1">
        <div className="row">
          <div className="col p-4">
            <NewsList
              query={keyword}
              language={language}
              source={selectedSource}
              max={max}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;