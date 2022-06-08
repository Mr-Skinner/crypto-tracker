import React, { useState, useEffect } from "react";
import axios from "axios";
import CoinArticle from "./CoinArticle";

import "./CoinArticles.css";

export function CoinArticles(props) {
  const NEWS_API_KEY = "b772214f9877db5bf8ddc9eb544a197c";
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  let fromDate = lastWeek.toLocaleString();

  const newsUrl =
    "https://gnews.io/api/v4/search?q=crypto AND " +
    props.name +
    "&language=en&from=" +
    fromDate +
    "&sortby=publishedAt&token=" +
    NEWS_API_KEY;

  const [news, setNews] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();

    axios
      .get(newsUrl, { signal: abortCont.signal })
      .then((res) => {
        let topArticles = [];
        for (let i = 0; i < 3; i++) {
          topArticles.push(res.data.articles[i]);
        }
        setNews(topArticles);
      })
      .catch((error) => {
        console.log("API ERROR:", error);
      });

    return () => {
      abortCont.abort();
    }
  }, [newsUrl]);

  //console.log(news);
  if (news.length > 0 && news[0] !== undefined) {
    return (
      <div className="coin-info-wrapper coin-info-bottom">
        <div className="coin-info-articles">
          {news.map((article, index) => {
            return (
              <CoinArticle
                author={article.source.name}
                title={article.title}
                publishedAt={article.publishedAt}
                description={article.description}
                url={article.url}
                image={article.image}
                key={index}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div className="coin-info-articles"></div>;
  }
}

export default CoinArticles;
