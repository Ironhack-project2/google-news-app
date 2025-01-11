import { useEffect, useState } from "react";
import {
  fetchNewsDataHub,
  fetchNewsApi,
  fetchApiTube,
} from "./params/newsService";
import NewsCard from "./news-card";
import Sidebar from "./ui/sidebar";
import Pagination from "./ui/pagination";

function NewsList({
  query = "",
  language = "en",
  source = "",
  max = 20,
  page,
  setPage,
  setSource,
}) {
  const [articles, setArticles] = useState([]);
  const [sources, setSources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  // Función para combinar y gestionar las noticias de las tres fuentes
  const fetchAllNews = async (currentPage) => {
    setIsLoading(true);
    setError(null);

    try {
      const [
        newsDataHubResponse,
        newsApiResponse,
        apiTubeResponse,
      ] = await Promise.all([
        fetchNewsDataHub(query, language, source, max, currentPage, import.meta.env.VITE_NEWSDATAHUB_API_KEY),
        fetchNewsApi(query, language, source, max, currentPage, import.meta.env.VITE_NEWSAPI_API_KEY),
        fetchApiTube(query, language, source, max, currentPage),
      ]);

      // Combinar artículos de las tres fuentes
      let combinedArticles = [
        ...newsDataHubResponse.articles,
        ...newsApiResponse.articles,
        ...apiTubeResponse.articles,
      ];

      // Si se ha seleccionado una fuente, filtrar los artículos
      if (source) {
        const normalizedSource = source.trim().toLowerCase();
        combinedArticles = combinedArticles.filter(
          (article) =>
            (article.source_title || "").trim().toLowerCase() === normalizedSource
        );
      }

      // Filtrar por la query en título o descripción
      const filteredArticles = combinedArticles.filter((article) => {
        const kw = query.toLowerCase();
        const title = article.title?.toLowerCase() || "";
        const description = article.description?.toLowerCase() || "";
        return title.includes(kw) || description.includes(kw);
      });

      // Eliminar duplicados basados en la URL del artículo
      const uniqueArticles = Array.from(
        new Map(filteredArticles.map((article) => [article.url, article])).values()
      );

      setArticles(uniqueArticles);

      // Obtener fuentes sin duplicar
      const combinedSources = Array.from(
        new Map(
          uniqueArticles
            .map((art) => ({
              name: art.source_title || "Fuente desconocida",
              id: art.source_title || "unknown",
            }))
            .filter((src) => src.name && src.id)
            .map((src) => [src.name, src])
        ).values()
      );
      setSources(combinedSources);

      // Calcular total de páginas basado en la suma de totalResults
      const totalResultsArray = [
        newsDataHubResponse.totalResults,
        newsApiResponse.totalResults,
        apiTubeResponse.totalResults,
      ];
      const availableTotalResults = totalResultsArray.filter((tr) => tr > 0);
      const totalResultsSum = availableTotalResults.reduce((acc, tr) => acc + tr, 0);
      const calculatedTotalPages = Math.ceil(totalResultsSum / max) || 1;
      setTotalPages(calculatedTotalPages);
    } catch (err) {
      console.error("Error combinando noticias:", err.message);
      setError(err.message || "Error al cargar las noticias. Por favor, inténtalo de nuevo más tarde.");
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Ejecutar la búsqueda cuando cambien query, language, source, max o page
  useEffect(() => {
    fetchAllNews(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, language, source, max, page]);

  // Manejar cambio de página
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Manejar cambio de fuente: se actualiza a través de la función pasada por props.
  const handleSourceChange = (selectedSource) => {
    if (setSource) {
      setSource(selectedSource);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar para filtrar fuentes */}
        <div className="col-md-3">
          <Sidebar sources={sources} setSelectedSource={handleSourceChange} />
        </div>
        {/* Lista de noticias */}
        <div className="col-md-9">
          {isLoading && <p className="text-center">Cargando noticias…</p>}
          {error && (
            <div className="text-center">
              <p className="text-danger">{error}</p>
              <button className="btn btn-primary" onClick={() => fetchAllNews(page)}>
                Reintentar
              </button>
            </div>
          )}
          {!isLoading && !error && articles.length === 0 && (
            <p className="text-center">No se encontraron noticias para esta búsqueda.</p>
          )}
          <div className="row">
            {articles.map((article) => (
              <div key={article.url || article.id} className="col-md-4 mb-4">
                <NewsCard article={article} />
              </div>
            ))}
          </div>
          {/* Paginación */}
          <div className="d-flex justify-content-center">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsList;