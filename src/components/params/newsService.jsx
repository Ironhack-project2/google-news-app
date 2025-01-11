import axios from "axios";
import {
  buildNewsDataHubParams,
  buildNewsApiParams,
} from "./paramUtils";

// Función para fetch NewsDataHub con paginación
export async function fetchNewsDataHub(query, language, source, max, page, apiKey) {
    try {
      const params = buildNewsDataHubParams(query, language, source, max, page);
      const response = await axios.get("https://api.newsdatahub.com/v1/news", {
        headers: { "X-Api-Key": apiKey },
        params,
      });
      return {
        articles: response.data?.data || [],
        totalResults: response.data?.totalResults || 0, // Ajusta según la respuesta de la API
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
      const response = await axios.get("https://newsapi.org/v2/top-headlines", {
        params,
      });
      return {
        articles: response.data?.articles?.map((article) => ({
          ...article,
          source_title: article.source.name,
        })) || [],
        totalResults: response.data?.totalResults || 0,
      };
    } catch (error) {
      console.error("Error fetching NewsAPI:", error.response?.data || error.message);
      return {
        articles: [],
        totalResults: 0,
      };
    }
  }

  export async function fetchApiTube(query, language, source, max, page) {
    try {
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
    
      return {
        articles: response.data?.articles?.map((article) => ({
          ...article,
          source_title: article.source?.name || "APITube",
        })) || [],
        totalResults: response.data?.totalResults || 0,
      };
    } catch (error) {
      console.error("Error fetching APITube:", error.response ? error.response.data : error.message);
      return {
        articles: [],
        totalResults: 0,
      };
    }
  }  