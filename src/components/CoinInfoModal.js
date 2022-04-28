import "./CoinInfoModal.css";

import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Dropdown, DropdownButton } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import CoinBasicStats from "./CoinBasicStats";
import CoinArticles from "./CoinArticles";
import axios from "axios";

function CoinInfoModal(props) {
  const now = Math.round(new Date().getTime() / 1000);
  const yesterday = now - 86400;
  const currencyMapping = {
    gbp: "£",
    usd: "$",
    eur: "€",
  };

  const accentClr = getComputedStyle(
    document.querySelector(":root")
  ).getPropertyValue("--accent-clr");

  const secClr = getComputedStyle(
    document.querySelector(":root")
  ).getPropertyValue("--sec-clr");

  let currentCurr = Object.keys(currencyMapping).find(
    (k) => currencyMapping[k] === props.curr
  );

  const [fromDate, setFromDate] = useState(yesterday);
  const [timeScale, setTimeScale] = useState("24h");
  const [priceHistory, setPriceHistory] = useState([]);

  const coingeckoUrl =
    "https://api.coingecko.com/api/v3/coins/" +
    props.id +
    "/market_chart/range?vs_currency=" +
    currentCurr +
    "&from=" +
    fromDate +
    "&to=" +
    now +
    "";
  //console.log(coingeckoUrl)

  const closeModal = (e) => {
    props.onCloseModal();
  };

  const convertDateTime = (subArray) => {
    let newDate = new Date(subArray[0]).toISOString();
    newDate = newDate.split("T")[0] + " " + newDate.split("T")[1].split(".")[0];
    let newArray = [newDate, subArray[1]];
    return newArray;
  };

  const changeTimescale = (e) => {
    let period = e.target.name;
    //console.log(period)
    if (period && period !== "") {
      setTimeScale(period);
    }
    switch (period) {
      case "24h":
        setFromDate(yesterday);
        break;
      case "Week":
        setFromDate(yesterday - 86400 * 7);
        break;
      case "Month":
        setFromDate(yesterday - 86400 * 30);
        break;
      case "3 Months":
        setFromDate(yesterday - 86400 * 90);
        break;
      case "6 Months":
        setFromDate(yesterday - 86400 * 180);
        break;
      case "12 Months":
        setFromDate(yesterday - 86400 * 240);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    axios
      .get(coingeckoUrl)
      .then((res) => {
        //console.log(res.data.prices);
        if (res.data.prices.length > 0) {
          let modifiedData = res.data.prices.map(convertDateTime);
          //console.log(modifiedData);
          setPriceHistory(modifiedData);
          //console.log(res.data.prices);
        }
      })
      .catch((error) => {
        alert("API ERROR");
      });
  }, [coingeckoUrl]);

  //console.log(priceHistory);

  let graphData = {
    labels: [],
    datasets: [
      {
        label: "",
        borderColor: accentClr,
        backgroundColor: accentClr,
        data: [],
      },
    ],
  };

  let graphOptions = {
    plugins: {
      title: {
        display: true,
        text: "Previous " + timeScale + " " + props.name + " Price",
        color: secClr,
      },
      legend: {
        display: false,
        position: "bottom",
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: secClr,
        },
      },
    },
  };

  let timeScalePriceDiff = 0;

  if (priceHistory.length > 0) {
    let priceDates = [];
    let priceValues = [];

    priceHistory.forEach((subArrayValue, i) => {
      priceDates.push(subArrayValue[0]);
      priceValues.push(subArrayValue[1]);
    });

    if (priceValues) {
      let currDiff = priceValues[priceValues.length - 1] - priceValues[0];
      if (currDiff !== 0)
        timeScalePriceDiff = (
          (currDiff / priceValues[priceValues.length - 1]) *
          100
        ).toFixed(2);
    }

    if (timeScale === "24h") timeScalePriceDiff = props.dayDiff;
    //console.log(priceDates);
    //console.log(priceValues);
    //console.log(priceInsight);

    graphData = {
      labels: priceDates,
      datasets: [
        {
          label: props.name + " price",
          borderColor: accentClr,
          backgroundColor: accentClr,
          data: priceValues,
        },
      ],
    };
  }

  return (
    <div className="modal-backdrop">
      <div className="coin-info-card">
        <div className="card-actions">
          <DropdownButton
            id="timescale-dropdown"
            title="Period"
            onClick={changeTimescale}
          >
            <Dropdown.Item href="" name="24h">
              Previous 24 Hours
            </Dropdown.Item>
            <Dropdown.Item href="" name="Week">
              Previous Week
            </Dropdown.Item>
            <Dropdown.Item href="" name="Month">
              Previous Month
            </Dropdown.Item>
            <Dropdown.Item href="" name="3 Months">
              Previous 3 Months
            </Dropdown.Item>
            <Dropdown.Item href="" name="6 Months">
              Previous 6 Months
            </Dropdown.Item>
            <Dropdown.Item href="" name="12 Months">
              Previous 12 Months
            </Dropdown.Item>
          </DropdownButton>
          <span
            className="card-action-btn close-modal-btn"
            onClick={closeModal}
          >
            <i className="bi bi-x-lg"></i>
          </span>
        </div>
        <div className="coin-info-wrapper coin-info-top">
          <div className="coin-info-left">
            <CoinBasicStats
              id={props.id}
              curr={props.curr}
              name={props.name}
              image={props.image}
              symbol={props.symbol}
              price={props.price}
              volume={props.volume}
              todaysHigh={props.todaysHigh}
              todaysLow={props.todaysLow}
              ath={props.ath}
              athDiff={props.athDiff}
              timeScale={timeScale}
              timeScaleDiff={timeScalePriceDiff}
            />
          </div>
          <div className="coin-info-right">
            <Line data={graphData} options={graphOptions} />
          </div>
        </div>
        <CoinArticles name={props.name} />
      </div>
    </div>
  );
}

export default CoinInfoModal;
