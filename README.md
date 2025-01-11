Google News App
Este es el ejercicio del módulo 2 del bootcamp de Web Development de Ironhack, que consiste en desarrollar una aplicación utilizando React para el frontend y Node.js para el backend.

Descripción
La aplicación Google News App recopila y muestra las noticias más recientes de las últimas 24 horas utilizando tres APIs distintas. Esto permite ofrecer una variedad de fuentes y perspectivas sobre las noticias actuales.

Características
- Noticias en Tiempo Real: Muestra noticias publicadas en las últimas 24 horas.
- Múltiples Fuentes: Integra tres APIs diferentes para diversificar el contenido.
- Búsqueda de Noticias: Permite buscar artículos específicos mediante palabras clave.
- Diseño Responsivo: Adaptable a dispositivos móviles y de escritorio.

Tecnologías Utilizadas
    Frontend
        React
        Axios para manejar las solicitudes HTTP
        CSS/Bootstrap para el diseño
    Backend
        Node.js
        Express.js
        Cors para gestionar CORS

Instalación
Sigue estos pasos para configurar el proyecto localmente:

Requisitos Previos
    Node.js instalado
    Git instalado

Pasos
Clonar el repositorio

git clone https://github.com/Ironhack-project2/google-news-app
cd google-news-app


Configurar el Backend
    cd backend
    npm install
    npm install -g nodemon

Crea un archivo .env en la carpeta backend y añade tus claves de API:
.env
VITE_NEWSDATAHUB_API_KEY=""
VITE_NEWSAPI_API_KEY=""
APITUBE_API_KEY=

Configurar el Frontend
    cd ../frontend
    npm install

Ejecutar la Aplicación

Abre dos terminales:
    En la primera, inicia el servidor backend:
        cd backend
        nodemon server.cjs
        Abre tu navegador y visita http://localhost:3000 para ver el servidor en funcionamiento

En la segunda, inicia el frontend:
    cd frontend
    npm run dev
    Abre tu navegador y visita http://localhost:5173 para ver la aplicación en funcionamento

Uso
    Ver noticias recientes: Al iniciar la aplicación, se mostrarán las noticias más recientes de las últimas 24 horas.
    Buscar artículos: Utiliza la barra de búsqueda para encontrar noticias específicas.
    Filtrar por fuente: Filtra las noticias según la fuente de la API.