const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); // Carga variables de entorno desde .env

const app = express();
const PORT = process.env.PORT || 3001;

// Verificar la API Key al iniciar el servidor
if (!process.env.APITUBE_API_KEY) {
  console.warn("⚠️  Advertencia: API key de APITube no está definida en .env");
} else {
  console.log("✅ APITUBE_API_KEY cargada correctamente.");
}

// Configuración de CORS para permitir peticiones desde tu frontend
app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto si tu frontend está en otro origen
}));

// Endpoint para APITube con soporte de paginación
app.get("/apitube", async (req, res) => {
  try {
    console.log("📥 Recibiendo solicitud a /apitube con params:", req.query);
    const { limit = "20", language = "en", query = "", page = "1" } = req.query;
    const apiKey = process.env.APITUBE_API_KEY;

    if (!apiKey) {
      console.log("❌ API key de APITube no proporcionada.");
      return res.status(400).json({ error: "API key de APITube no proporcionada." });
    }

    const options = {
      method: "GET",
      url: "https://api.apitube.io/v1/news/top-headlines",
      params: {
        api_key: apiKey,
        limit,
        language,
        query,
        page, // Añadimos el parámetro de página
      },
    };

    const response = await axios.request(options);
    console.log("✅ Respuesta de APITube recibida.");
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error llamando a APITube:", error.response?.data || error.message);
    res.status(500).json({ error: "Error al obtener datos de APITube" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server listening on port ${PORT}`);
});