import React, { useState } from "react";
import "./Coin.css";
import CoinInfoModal from "./CoinInfoModal";
import CoinBasicStats from "./CoinBasicStats";

function Coin({
  onFavToggle,
  favourites,
  id,
  curr,
  name,
  image,
  symbol,
  price,
  volume,
  todaysHigh,
  todaysLow,
  ath,
  athDiff,
  dayDiff,
}) {
  const [isExpanded, setExpand] = useState(false);

  let timeScale = "24h";
  let timeScaleDiff = dayDiff;

  let isFavourite = favourites.includes(symbol);
  const onFavouriteToggle = (e) => {
    onFavToggle(symbol);
    if (favourites.includes(symbol)) {
      isFavourite = true;
    } else {
      isFavourite = false;
    }
  };

  const onExpandToggle = (e) => {
    setExpand(!isExpanded);
  };

  if (isExpanded) {
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    return (
      <CoinInfoModal
        id={id}
        curr={curr}
        name={name}
        image={image}
        symbol={symbol}
        price={price}
        volume={volume}
        todaysHigh={todaysHigh}
        todaysLow={todaysLow}
        ath={ath}
        athDiff={athDiff}
        dayDiff={dayDiff}
        onCloseModal={onExpandToggle}
      />
    );
  } else {
    document.body.style.position = "";
    document.body.style.top = "";
    return (
      <div className="container coin-card" id={"coin_" + id}>
        <div className="card-actions">
          <span className="card-action-btn" onClick={onFavouriteToggle}>
            <i
              className={"bi " + (isFavourite ? "bi-star-fill" : "bi-star")}
            ></i>
          </span>
          <span className="card-action-btn" onClick={onExpandToggle}>
            <i className="bi bi-arrows-angle-expand"></i>
          </span>
        </div>
        <CoinBasicStats
          id={id}
          curr={curr}
          name={name}
          image={image}
          symbol={symbol}
          price={price}
          volume={volume}
          todaysHigh={todaysHigh}
          todaysLow={todaysLow}
          ath={ath}
          athDiff={athDiff}
          timeScaleDiff={timeScaleDiff}
          timeScale={timeScale}
        />
      </div>
    );
  }
}

export default Coin;
