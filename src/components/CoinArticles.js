import React, { useState, useEffect } from "react";
import axios from "axios";
import CoinArticle from "./CoinArticle";

import "./CoinArticles.css";

export function CoinArticles(props) {
  const NEWS_API_KEY = "b4a62f3a9e67456f8b3020105953ca75";
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  let fromDate = lastWeek.toLocaleString();

  const newsUrl =
    "https://newsapi.org/v2/everything?q=+crypto AND +" +
    props.name +
    "&language=en&searchIn=title&from=" +
    fromDate +
    "&sortBy=popularity&apiKey=" +
    NEWS_API_KEY;

  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get(newsUrl)
      .then((res) => {
        let topArticles = [];
        for (let i = 0; i < 3; i++) {
          topArticles.push(res.data.articles[i]);
        }
        setNews(topArticles);
        console.log(res.data);
      })
      .catch((error) => {
        alert("API ERROR");
      });
  }, [newsUrl]);

  console.log(news);

  return (
    <div className="coin-info-articles">
      {news.map((article, index) => {
        return (
          <CoinArticle
            author={article.author}
            title={article.title}
            publishedAt={article.publishedAt}
            description={article.description}
            url={article.url}
            image={article.urlToImage}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default CoinArticles;
