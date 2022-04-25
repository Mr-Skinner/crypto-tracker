import React, { useState } from "react";
import "./Coin.css";
import CoinInfoModal from "./CoinInfoModal";

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
  }) {
  
  const [isExpanded, setExpand] = useState(false);

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
    if (isExpanded) {

    }
    setExpand(!isExpanded);
  };

  if (isExpanded) {
    return(
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
      onCloseModal={onExpandToggle}
      />
    );
  } else {
  return (
    <div className="container coin-card" id={"coin_" + id}>
      <div className="card-actions">
        <span className="card-action-btn" onClick={onFavouriteToggle}>
          <i className={"bi " + (isFavourite ? "bi-star-fill" : "bi-star")}></i>
        </span>
        <span className="card-action-btn" onClick={onExpandToggle}>
          <i className="bi bi-arrows-angle-expand"></i>
        </span>
      </div>
      <div className="row">
        <div className="coin-title">
          <img src={image} alt="" />
        </div>
        <div className="coin-title">
          <h3>
            {name} ({symbol})
          </h3>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="coin-stats">
          <p>Current price: </p>
          <p>
            {curr} {price.toLocaleString("en-UK")}
          </p>
        </div>
        <div className="coin-stats">
          <p>All Time High: </p>
          <p>
            {curr} {ath.toLocaleString("en-UK")}
          </p>
        </div>
        <div className="coin-stats">
          <p>24 High: </p>
          <p>
            {curr} {todaysHigh.toLocaleString("en-UK")}
          </p>
        </div>
        <div className="coin-stats">
          <p>24 Low: </p>
          <p>
            {curr} {todaysLow.toLocaleString("en-UK")}
          </p>
        </div>
        <div className="coin-stats">
          <p>Market Cap: </p>
          <p>{volume.toLocaleString("en-UK")}</p>
        </div>
      </div>
    </div>
  );
  }
}

export default Coin;
