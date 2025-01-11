import React from "react";

const NewsCard = ({ article }) => {
  const fecha = article.publishedAt
    ? new Date(article.publishedAt).toLocaleString()
    : "-";

  const link = article.url || article.article_link || "#";
  const imageURL =
    article.urlToImage ||
    article.media_url ||
    "https://assets.entrepreneur.com/content/3x2/2000/1655933670-googlenews-logo.jpg?format=pjeg&auto=webp&crop=16:9&width=675&height=380";

    return (
      <div className="card h-100 shadow-sm" style={{ minHeight: "450px" }}>
        <img
          src={imageURL}
          className="card-img-top"
          alt={article.title || "Noticia"}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title text-dark fw-bold" style={{ fontSize: "1.2rem" }}>
            {article.title}
          </h5>
          <p className="card-text text-muted">
            {article.description
              ? article.description.substring(0, 100) + "..."
              : "Sin descripción disponible."}
          </p>
          <p className="card-text">
            <small className="text-muted">
              Fuente: {article.source_title || "Desconocido"}
            </small>
          </p>
          <p className="card-text">
            <small className="text-muted">Fecha: {fecha}</small>
          </p>
          <a
            href={link}
            className="btn btn-primary mt-2 w-100"
            target="_blank"
            rel="noreferrer"
            style={{ transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Ver más
          </a>
        </div>
      </div>
    );    
};

export default NewsCard;