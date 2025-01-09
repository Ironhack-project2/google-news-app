// src/components/news-list.jsx
import { useEffect, useState } from "react";
import {
  fetchNewsDataHub,
  fetchNewsApi,
  fetchApiTube,
} from "./params/newsService"; // Ruta correcta dentro de components
import NewsCard from "./news-card"; // Está directamente en components
import Sidebar from "./ui/sidebar"; // Asumiendo que sidebar está en components/ui
import Pagination from "./ui/pagination"; // Nuevo componente de paginación

function NewsList({ query = "", language = "en", source = "", max = 20 }) {
  const [articles, setArticles] = useState([]);
  const [sources, setSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState(source);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas

  // Variables de entorno para las dos APIs
  const NEWSDATAHUB_API_KEY = import.meta.env.VITE_NEWSDATAHUB_API_KEY;
  const NEWSAPI_API_KEY = import.meta.env.VITE_NEWSAPI_API_KEY;

  // Función que combina las noticias de las tres fuentes
  const fetchAllNews = async (page = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      // Ejecutar las tres peticiones en paralelo
      const [newsDataHubResponse, newsApiResponse, apiTubeResponse] = await Promise.all([
        fetchNewsDataHub(query, language, selectedSource, max, page, NEWSDATAHUB_API_KEY),
        fetchNewsApi(query, language, selectedSource, max, page, NEWSAPI_API_KEY),
        fetchApiTube(query, language, max, page),
      ]);

      // Combinar artículos de las tres fuentes
      const combinedArticles = [
        ...newsDataHubResponse.articles,
        ...newsApiResponse.articles,
        ...apiTubeResponse.articles,
      ];

      // Filtrar por 'query' en título o descripción (si es necesario)
      const filteredArticles = combinedArticles.filter((article) => {
        const kw = query.toLowerCase();
        const title = article.title?.toLowerCase() || "";
        const description = article.description?.toLowerCase() || "";
        return title.includes(kw) || description.includes(kw);
      });

      // Limitar a los primeros 'max' artículos
      setArticles(filteredArticles.slice(0, max));

      // Obtener fuentes sin duplicar
      const combinedSources = Array.from(
        new Map(
          combinedArticles
            .map((art) => ({
              name: art.source_title || "Fuente desconocida",
              id: art.source_title || "unknown",
            }))
            .filter((src) => src.name && src.id)
            .map((src) => [src.name, src])
        ).values()
      );

      setSources(combinedSources);

      // Calcular total de páginas basado en el menor totalResults de las APIs
      const totalResultsArray = [
        newsDataHubResponse.totalResults,
        newsApiResponse.totalResults,
        apiTubeResponse.totalResults,
      ];

      // Si alguna API no proporciona totalResults, manejamos el cálculo en base a las disponibles
      const availableTotalResults = totalResultsArray.filter((tr) => tr > 0);
      const minTotalResults = availableTotalResults.length > 0 ? Math.min(...availableTotalResults) : 0;

      const calculatedTotalPages = Math.ceil(minTotalResults / max) || 1;
      setTotalPages(calculatedTotalPages);
    } catch (err) {
      console.error("Error combinando noticias:", err);
      setError("Error al cargar las noticias. Por favor, inténtalo de nuevo más tarde.");
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Ejecutar la búsqueda cuando cambien query, language, source o max
  useEffect(() => {
    setCurrentPage(1); // Reiniciar a la página 1 cuando cambian los filtros
    fetchAllNews(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, language, selectedSource, max]);

  // Manejar cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchAllNews(page);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Barra lateral para filtrar fuentes */}
        <div className="col-md-3">
          <Sidebar sources={sources} setSelectedSource={setSelectedSource} />
        </div>
        {/* Lista de noticias */}
        <div className="col-md-9">
          {isLoading && <p className="text-center">Cargando noticias…</p>}
          {error && (
            <div className="text-center">
              <p className="text-danger">{error}</p>
              <button className="btn btn-primary" onClick={() => fetchAllNews(currentPage)}>
                Reintentar
              </button>
            </div>
          )}
          {!isLoading && !error && articles.length === 0 && (
            <p className="text-center">
              No se encontraron noticias para esta búsqueda.
            </p>
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
          {/* Controles de Paginación */}
          <div className="d-flex justify-content-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsList;