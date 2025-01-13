import React from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "./components/ui/footer.jsx";
import Header from "./components/ui/header.jsx";
import NewsList from "./components/news-list.jsx";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const language = searchParams.get("language") || "en";
  const keyword = searchParams.get("query") || "";
  const selectedSource = searchParams.get("source") || "";
  const max = parseInt(searchParams.get("max") || "20", 10);
  const page = searchParams.get("page") || "1";

  // Función para actualizar params
  const updateSearchParams = (newParams) => {
    setSearchParams((prevParams) => {
      const updatedParams = new URLSearchParams(prevParams);
      Object.keys(newParams).forEach((key) => {
        if (newParams[key]) {
          updatedParams.set(key, newParams[key]);
        } else {
          updatedParams.delete(key);
        }
      });
      return updatedParams;
    });
  };

  // Reset: dejar la URL sin parámetros (http://localhost:5173/)
  const resetSearch = () => {
    setSearchParams({});
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        keyword={keyword}
        setKeyword={(kw) => updateSearchParams({ query: kw })}
        language={language}
        setLanguage={(lang) => updateSearchParams({ language: lang })}
        resetSearch={resetSearch}
      />
      <div className="container-fluid flex-grow-1">
        <div className="row">
          <div className="col p-4">
            <NewsList
              query={keyword}
              language={language}
              source={selectedSource}
              max={max}
              page={parseInt(page, 10)}
              setPage={(p) => updateSearchParams({ page: p.toString() })}
              setSource={(src) => updateSearchParams({ source: src, page: "1" })}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;