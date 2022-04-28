function CoinBasicStats(props) {
  return (
    <div>
      <div className="row">
        <div className="coin-title">
          <img src={props.image} alt="" />
        </div>
        <div className="coin-title">
          <h3>
            {props.name} ({props.symbol})
          </h3>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="coin-stats">
          <p>Current price: </p>
          <div>
            <p>
              {props.curr}{" "}
              {props.price.toLocaleString("en-UK", {
                maximumFractionDigits: 6,
              })}
            </p>
            <p className="sub-stat">
              {props.timeScale +
                " change: " +
                Math.abs(props.timeScaleDiff) +
                "% "}
              <i
                className={
                  "bi " +
                  (props.timeScaleDiff > 0 ? "bi-arrow-up" : "bi-arrow-down")
                }
              ></i>
            </p>
          </div>
        </div>
        <div className="coin-stats">
          <p>All Time High: </p>
          <div>
            {props.curr}{" "}
            {props.ath.toLocaleString("en-UK", {
              maximumFractionDigits: 6,
            })}
            <p className="sub-stat">
              {"ATH change: " + Math.abs(props.athDiff) + "% "}
              <i
                className={
                  "bi " + (props.athDiff > 0 ? "bi-arrow-up" : "bi-arrow-down")
                }
              ></i>
            </p>
          </div>
        </div>
        <div className="coin-stats">
          <p>{props.timeScale} High: </p>
          <p>
            {props.curr}{" "}
            {props.todaysHigh.toLocaleString("en-UK", {
              maximumFractionDigits: 6,
            })}
          </p>
        </div>
        <div className="coin-stats">
          <p>{props.timeScale} Low: </p>
          <p>
            {props.curr}{" "}
            {props.todaysLow.toLocaleString("en-UK", {
              maximumFractionDigits: 6,
            })}
          </p>
        </div>
        <div className="coin-stats">
          <p>Market Cap: </p>
          <p>{props.volume.toLocaleString("en-UK")}</p>
        </div>
      </div>
    </div>
  );
}

export default CoinBasicStats;
