import { useEffect, useState } from "react";
import axios from "axios";

function NewsList({ className = '', query = '', max = 10 }) {
  const [articles, setArticles] = useState([]);
  const API_KEY = '64ca2eb893b045fca825eeed4246c55f';

  useEffect(() => {
    axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`)
      .then((response) => {
        if (response.data && response.data.articles) {
          setArticles(response.data.articles.slice(0, max));
        }
      })
      .catch((error) => console.error(error));
  }, [query, max]);

  return (
    <div className={`d-flex flex-wrap gap-3 ${className}`}>
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
}

export default NewsList;