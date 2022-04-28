import "./CoinArticle.css";

export function CoinArticle(props) {
  let publishedDate = props.publishedAt.split("T")[0];

  return (
    <div className="coin-article-container">
      <div className="article-header-banner">
        <div className="article-header-left">
          <img src={props.image} alt="" className="article-image" />
          <div className="coin-article-title-group">
            <h3 className="coin-article-title">{props.title}</h3>
            <p className="coin-article-subtitle">News • {publishedDate}</p>
            <p className="coin-article-text">{props.description}</p>
          </div>
        </div>
        <div className="article-header-right">
          <a href={props.url} target="_blank">
            <i className="bi bi-link-45deg article-action-icon"></i>
          </a>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default CoinArticle;
