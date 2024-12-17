import { useEffect, useState } from "react";
import axios from "axios";
import NewCard from "../new-card/new-card";
import newsData from "../../../../new-api.json";


function NewList({ className = '', query = '', max = 10 }) {
  const [news, setNews] = useState([]);
  /*const API_KEY = '64ca2eb893b045fca825eeed4246c55f';

  useEffect(() => {
    axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`)
      .then((response) => {
        if (response.data && response.data.articles) {
          setNews(response.data.news.slice(0, max));
        }
      })
      .catch((error) => console.error(error));
  }, [query, max]);*/

  useEffect (() => {
    setNews (newsData);
   /* fetch('http://localhost:3000/news')
     .then ((response) => response.json())
     .then ((news) => {
      setNews(news);
     })
     .catch((error) => console.error(error))
     .finally(() => console.info ("ME EJECUTO SIEMPRE")) */
    
  }, []);

  return (
    <div className={`d-flex flex-wrap gap-3 ${className}`}>
      {news.map((news) => (
        <NewCard key={news.id} new={news} />
      ))}
    </div>
  );
}

export default NewList;