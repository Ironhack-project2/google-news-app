import React from "react";

const NewsCard = ({ article }) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{article.title}</h5>
        <p className="card-text">
          {article.description
            ? article.description.substring(0, 100) + "..."
            : "Sin descripción disponible."}
        </p>
        <p className="card-text">
          <small className="text-muted">Fuente: {article.source_title || "Desconocido"}</small>
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Ver más
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
