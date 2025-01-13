import { useEffect, useState, useRef } from "react";
import {
  fetchNewsDataHub,
  fetchNewsApi,
  fetchApiTube,
} from "./params/newsService";
import NewsCard from "./news-card";
import Sidebar from "./ui/sidebar";
import Pagination from "./ui/pagination";

// Función para decodificar repetidamente (maneja '%2520' -> '%20' -> ' ')
function safeDecode(raw) {
  let result = raw;
  try {
    while (true) {
      const temp = decodeURIComponent(result);
      if (temp === result) break;
      result = temp;
    }
  } catch {
    // Si falla, usamos lo que tengamos hasta ahora
  }
  return result.trim();
}

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

  // Cache para no llamar a las APIs reiteradamente
  const cache = useRef({});

  // Filtra artículos localmente según "source"
  const filterBySource = (arts, src) => {
    if (!src) return arts;
    const decodedSource = safeDecode(src);
    const normalize = (str) =>
      str.toLowerCase().replace(/^the\s+/, "").replace(/\s+/g, "");
    const normalizedSource = normalize(decodedSource);

    console.log("DEBUG: Filtrando localmente por fuente normalizada:", normalizedSource);

    return arts.filter((article) => {
      const articleSource = article.source_title || "";
      const articleSourceNorm = normalize(articleSource);
      return articleSourceNorm.includes(normalizedSource);
    });
  };

  // Filtra artículos localmente según "query"
  const filterByQuery = (arts, kw) => {
    if (!kw) return arts;
    const lowerKw = kw.toLowerCase();

    console.log("DEBUG: Filtrando localmente por query:", lowerKw);

    return arts.filter((article) => {
      const title = article.title?.toLowerCase() || "";
      const description = article.description?.toLowerCase() || "";
      return title.includes(lowerKw) || description.includes(lowerKw);
    });
  };

  const fetchAllNews = async (currentPage) => {
    console.log("DEBUG: En fetchAllNews con source =", source);

    // Generamos una clave de caché que no use 'source' (porque filtramos local)
    const cacheKey = JSON.stringify({ query, language, max, currentPage });

    // Usar caché si existe y no está vacía
    if (cache.current[cacheKey]) {
      const { articles, sources, totalPages } = cache.current[cacheKey];
      if (articles.length > 0 || sources.length > 0) {
        console.log("▶ Usando caché para:", cacheKey);

        // Aplica filtrado local para source y query
        let finalArticles = [...articles];

        if (source) {
          finalArticles = filterBySource(finalArticles, source);
        }
        if (query) {
          finalArticles = filterByQuery(finalArticles, query);
        }

        // FILTRO PARA "[Removed]"
        finalArticles = finalArticles.filter((article) => {
          const t = (article.title || "").trim().toLowerCase();
          const s = (article.source_title || "").trim().toLowerCase();
          const d = (article.description || "").trim().toLowerCase();
          return t !== "[removed]" && s !== "[removed]" && d !== "[removed]";
        });

        // Deduplicado final
        const uniqueArticles = Array.from(
          new Map(
            finalArticles.map((art) => [
              `${(art.url || "").trim()}-${(art.title || "").trim()}`,
              art,
            ])
          ).values()
        );

        setArticles(uniqueArticles);
        setSources(sources);
        setTotalPages(totalPages);
        return;
      } else {
        console.log(
          "▶ La caché para",
          cacheKey,
          "tenía 0 resultados. Reintentando fetch..."
        );
      }
    }

    setIsLoading(true);
    setError(null);

    try {
      // Llamamos a las APIs sin pasar 'source' (traemos todo y filtramos local)
      const results = await Promise.allSettled([
        fetchNewsDataHub(
          query,
          language,
          "",
          max,
          currentPage,
          import.meta.env.VITE_NEWSDATAHUB_API_KEY
        ),
        fetchNewsApi(
          query,
          language,
          "",
          max,
          currentPage,
          import.meta.env.VITE_NEWSAPI_API_KEY
        ),
        fetchApiTube(query, language, "", max, currentPage),
      ]);

      const newsDataHubResponse =
        results[0].status === "fulfilled"
          ? results[0].value
          : { articles: [], totalResults: 0 };

      const newsApiResponse =
        results[1].status === "fulfilled"
          ? results[1].value
          : { articles: [], totalResults: 0 };

      const apiTubeResponse =
        results[2].status === "fulfilled"
          ? results[2].value
          : { articles: [], totalResults: 0 };

      let combinedArticles = [
        ...newsDataHubResponse.articles,
        ...newsApiResponse.articles,
        ...apiTubeResponse.articles,
      ];

      console.log("DEBUG: Artículos combinados (antes de filtro local):", combinedArticles);

      // FILTRO LOCAL POR FUENTE
      if (source) {
        combinedArticles = filterBySource(combinedArticles, source);
      }

      // FILTRO LOCAL POR QUERY
      if (query) {
        combinedArticles = filterByQuery(combinedArticles, query);
      }

      // FILTRO PARA "[Removed]"
      combinedArticles = combinedArticles.filter((article) => {
        const t = (article.title || "").trim().toLowerCase();
        const s = (article.source_title || "").trim().toLowerCase();
        const d = (article.description || "").trim().toLowerCase();
        return t !== "[removed]" && s !== "[removed]" && d !== "[removed]";
      });

      // DEDUPLICADO
      const uniqueArticles = Array.from(
        new Map(
          combinedArticles.map((art) => [
            `${(art.url || "").trim()}-${(art.title || "").trim()}`,
            art,
          ])
        ).values()
      );

      // Construir la lista de fuentes
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

      // Calcular total de páginas
      const totalResultsArray = [
        newsDataHubResponse.totalResults,
        newsApiResponse.totalResults,
        apiTubeResponse.totalResults,
      ];
      const availableTotalResults = totalResultsArray.filter((t) => t > 0);
      const totalResultsSum = availableTotalResults.reduce((acc, t) => acc + t, 0);
      const calculatedTotalPages = Math.ceil(totalResultsSum / max) || 1;

      setArticles(uniqueArticles);
      setSources(combinedSources);
      setTotalPages(calculatedTotalPages);

      // Guardar en caché (con los artículos sin "source" API, pero sí deduplicados)
      cache.current[cacheKey] = {
        articles: uniqueArticles,
        sources: combinedSources,
        totalPages: calculatedTotalPages,
      };
    } catch (err) {
      console.error("Error combinando noticias:", err.message);
      setError(
        err.message ||
          "Error al cargar las noticias. Por favor, inténtalo de nuevo más tarde."
      );
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect con TODAS las dependencias
  useEffect(() => {
    console.log(
      "DEBUG: useEffect disparado. query=%s, language=%s, source=%s, max=%s, page=%s",
      query,
      language,
      source,
      max,
      page
    );

    const timer = setTimeout(() => {
      fetchAllNews(page);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, language, source, max, page]); // Importante no ignorar 'source'

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

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
          <div className="d-flex justify-content-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsList;