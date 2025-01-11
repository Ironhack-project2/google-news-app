const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Verificar la API Key al iniciar el servidor
if (!process.env.APITUBE_API_KEY) {
  console.warn("⚠️  Advertencia: API key de APITube no está definida en .env");
} else {
  console.log("✅ APITUBE_API_KEY cargada correctamente.");
}

// Configuración de CORS para permitir peticiones desde el frontend
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Endpoint para APITube con soporte de paginación y filtrado por fuente
app.get("/apitube", async (req, res) => {
  try {
    console.log("📥 Recibiendo solicitud a /apitube con params:", req.query);

    // Extraer parámetros de la consulta
    const { limit = "20", language = "en", query = "", page = "1", source = "" } = req.query;
    const apiKey = process.env.APITUBE_API_KEY;

    if (!apiKey) {
      console.log("❌ API key de APITube no proporcionada.");
      return res.status(400).json({ error: "API key de APITube no proporcionada." });
    }

    // Validar que 'limit' y 'page' sean números
    if (isNaN(limit) || isNaN(page)) {
      console.log("❌ Parámetros 'limit' o 'page' no son números válidos.");
      return res.status(400).json({ error: "'limit' y 'page' deben ser números válidos." });
    }

    const options = {
      method: "GET",
      url: "https://api.apitube.io/v1/news/top-headlines",
      params: {
        api_key: apiKey,
        limit,
        language,
        query,
        page,
      },
      timeout: 5000, // Tiempo de espera: 5 segundos
    };

    // Incluir el parámetro de fuente si se ha definido
    if (source) {
      options.params.source = source; // Asegúrate de que "source" es el nombre correcto según la documentación
    }

    // Realizar la petición a APITube
    const response = await axios.request(options);
    console.log("✅ Respuesta de APITube recibida:", response.data);

    // Retornar la respuesta tal cual la recibe el servidor
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un status diferente a 2xx
      console.error("❌ Error llamando a APITube:", error.response.data);
      res.status(500).json({
        error: "Error al obtener datos de APITube",
        details: error.response.data,
      });
    } else if (error.request) {
      // La solicitud fue hecha pero no hubo respuesta
      console.error("❌ No se recibió respuesta de APITube:", error.request);
      res.status(500).json({ error: "No se recibió respuesta de APITube" });
    } else {
      // Ocurrió un error al configurar la solicitud
      console.error("❌ Error en la configuración de la solicitud a APITube:", error.message);
      res.status(500).json({
        error: "Error en la configuración de la solicitud a APITube",
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server listening on port ${PORT}`);
});