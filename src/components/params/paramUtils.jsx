// Construye params para NewsDataHub
export function buildNewsDataHubParams(query, language, source, max, page) {
  const params = {
    q: query,
    language,
    sources: source,
    limit: max,
    page,
  };
  return params;
}
  
  // Construye params para NewsAPI
  export function buildNewsApiParams(query, language, source, max, page, apiKey) {
    const params = {
      q: query,
      language,
      sources: source,
      pageSize: max, // NewsAPI usa 'pageSize' en lugar de 'limit'
      page, // Añadimos el parámetro de página
      apiKey, // Asegúrate de que la API key está incluida
    };
    return params;
  }  
  
  // Construye params para APITube
  export function buildApiTubeParams(query, language, source, max, apiKey) {
    const params = { apiKey, pageSize: max };
    if (query) params.q = query;
    if (language) params.language = language;
    if (source) params.sources = source;
    return params;
  }  
