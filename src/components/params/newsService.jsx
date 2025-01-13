import axios from "axios";
import { buildNewsDataHubParams, buildNewsApiParams } from "./paramUtils";

// Función para fetch NewsDataHub con paginación
export async function fetchNewsDataHub(query, language, source, max, page, apiKey) {
  try {
    const params = buildNewsDataHubParams(query, language, source, max, page);
    console.log("▶ fetchNewsDataHub() params:", params);

    const response = await axios.get("https://api.newsdatahub.com/v1/news", {
      headers: { "X-Api-Key": apiKey },
      params,
    });
    // Log para ver la cantidad de artículos
    console.log("✅ Respuesta NewsDataHub:", response.data?.data?.length || 0, "artículos");
    return {
      articles: response.data?.data || [],
      totalResults: response.data?.totalResults || 0,
    };
  } catch (error) {
    console.error("Error fetching NewsDataHub:", error.response?.data || error.message);
    return {
      articles: [],
      totalResults: 0,
    };
  }
}

// Función para fetch NewsAPI con paginación
export async function fetchNewsApi(query, language, source, max, page, apiKey) {
  try {
    const params = buildNewsApiParams(query, language, source, max, page, apiKey);
    console.log("▶ fetchNewsApi() params:", params);

    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params,
    });
    console.log(
      "✅ Respuesta NewsAPI:",
      response.data?.articles?.length || 0,
      "artículos"
    );
    return {
      articles:
        response.data?.articles?.map((article) => ({
          ...article,
          source_title: article.source.name,
        })) || [],
      totalResults: response.data?.totalResults || 0,
    };
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.warn("Límite de solicitudes alcanzado en NewsAPI:", error.response.data);
    } else {
      console.error("Error fetching NewsAPI:", error.response?.data || error.message);
    }
    return {
      articles: [],
      totalResults: 0,
    };
  }
}

// Función para fetch APITube
export async function fetchApiTube(query, language, source, max, page) {
  try {
    console.log("▶ fetchApiTube() con params:", { query, language, source, max, page });
    const params = {
      query,
      language,
      limit: max,
      page,
    };
    if (source) {
      params.source = source;
    }

    const response = await axios.get("/apitube", { params });

    let articles = [];
    let totalResults = 0;

    if (response.data) {
      if (Array.isArray(response.data.articles)) {
        articles = response.data.articles.map((article) => ({
          ...article,
          source_title: article.source?.name || "APITube",
        }));
        totalResults = response.data.totalResults || articles.length;
      } else if (response.data.id) {
        articles = [
          {
            ...response.data,
            source_title: response.data.source?.name || "APITube",
          },
        ];
        totalResults = 1;
      }
    }
    console.log("✅ Respuesta APITube:", articles.length, "artículos");
    return {
      articles,
      totalResults,
    };
  } catch (error) {
    console.error(
      "Error fetching APITube:",
      error.response ? error.response.data : error.message
    );
    return {
      articles: [],
      totalResults: 0,
    };
  }
}