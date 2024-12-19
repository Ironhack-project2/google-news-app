import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./news-card";

function NewsList({ query = '', language = 'es', country = 'es', max = 15 }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
   const [filteredData, setFIlteredData] = useState([]);
  const API_KEY = 'k_Bd2ILMACOlVls6Ss6_wdQwq3Y5M-B0dhW6fMmgdlI';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('https://api.newsdatahub.com/v1/news', {
          headers: { 'X-Api-Key': API_KEY },
          params: {
            language,
            country,
          },
        });

        if (response.data && response.data.data) {
          setArticles(response.data.data.slice(0, max));
        }
      } catch (err) {
        setError("Error al cargar las noticias. Inténtalo de nuevo más tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, language, country, max]);

  return (
    <div className="news-list">
      {isLoading && <p className="text-center">Cargando noticias...</p>}
      {error && <p className="text-danger text-center">{error}</p>}
      {!isLoading && !error && articles.length === 0 && (
        <p className="text-center">No se encontraron noticias.</p>
      )}
      <div className="row">
        {articles.map((article, index) => (
          <div key={index} className="col-md-4 mb-4">
            <NewsCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsList;
