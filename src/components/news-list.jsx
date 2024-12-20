import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./news-card";
import Sidebar from "./ui/sidebar";

const getLanguageParams = (language) => (language ? { language } : {});
const getQueryParams = (query) => (query ? { query } : {});

function NewsList({ query = "", language = "es", source = "", max = 20 }) {
  const [articles, setArticles] = useState([]);
  const [sources, setSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //  TODO: check how to use env var in React projects
  const NEWSDATAHUB_API_KEY = "k_Bd2ILMACOlVls6Ss6_wdQwq3Y5M-B0dhW6fMmgdlI";
  const NEWSAPI_API_KEY = "64ca2eb893b045fca825eeed4246c55f";

  const fetchNewsDataHub = async () => {
    try {
      const params = {
        ...getQueryParams(query),
        ...getLanguageParams(language),
        limit: max 
      };
      if (source) params.source = source;

      const response = await axios.get("https://api.newsdatahub.com/v1/news", {
        headers: { "X-Api-Key": NEWSDATAHUB_API_KEY },
        params,
      });

      return response.data?.data || [];
    } catch (error) {
      console.error("Error fetching NewsDataHub:", error);
      return [];
    }
  };

  const fetchNewsApi = async () => {
    try {
      const params = {
        apiKey: NEWSAPI_API_KEY,
        ...getQueryParams(query),
        ...getLanguageParams(language),
        pageSize: max
      };
      if (source) params.sources = source;

      const response = await axios.get("https://newsapi.org/v2/top-headlines", { params });

      return (
        response.data?.articles?.map((article) => ({
          ...article,
          source_title: article.source.name,
        })) || []
      );
    } catch (error) {
      console.error("Error fetching NewsAPI:", error);
      return [];
    }
  };

  const fetchAllNews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [newsDataHubArticles, newsApiArticles] = await Promise.all([
        fetchNewsDataHub(),
        fetchNewsApi(),
      ]);

      const combinedArticles = [...newsDataHubArticles, ...newsApiArticles];

      console.log('combinedArticles length', combinedArticles.length);

      //  TODO: check this state changing once search word changed
      setArticles(combinedArticles.slice(0, max));

      const combinedSources = Array.from(
        new Map(
          combinedArticles
            .map((article) => ({
              name: article.source_title || "Fuente desconocida",
              id: article.source_title || "unknown",
            }))
            .filter((source) => source.name && source.id)
            .map((source) => [source.name, source])
        ).values()
      );

      setSources(combinedSources);
    } catch (err) {
      console.error("Error combinando las noticias:", err);
      setError("Error al cargar las noticias. Inténtalo de nuevo más tarde.");
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNews();
  }, [query, language, source, max]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar sources={sources} setSelectedSource={setSelectedSource} />
        </div>
        <div className="col-md-9">
          {isLoading && <p className="text-center">Cargando noticias...</p>}
          {error && (
            <div className="text-center">
              <p className="text-danger">{error}</p>
              <button className="btn btn-primary" onClick={fetchAllNews}>
                Reintentar
              </button>
            </div>
          )}
          {!isLoading && !error && articles.length === 0 && (
            <p className="text-center">No se encontraron noticias para esta búsqueda.</p>
          )}
          <div className="row">
            {articles
              .filter((article) =>
                selectedSource ? article.source_title === selectedSource : true
              )
              .map((article, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <NewsCard article={article} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsList;