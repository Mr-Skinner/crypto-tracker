import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import Navbar from "./components/Header/Navbar";
import Coin from "./components/Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [favourites, setFavs] = useState(["default"]);
  const [currency, setCurrency] = useState("gbp");
  const [sortBy, setSort] = useState("market_cap");
  const currencyMapping = {
    gbp: "£",
    usd: "$",
    eur: "€",
  };

  const coingeckoUrl =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=" +
    currency +
    "&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  
  let filteredCoins = [];

  useEffect(() => {
    axios
      .get(coingeckoUrl)
      .then((res) => {
        setCoins(res.data);
        //console.log(res.data);
      })
      .catch((error) => {
        alert("API ERROR");
      });
  }, [coingeckoUrl, favourites]);

  const searchHandler = (input) => {
    setSearch(input);
  };

  const currencyHandler = (curr) => {
    if (curr !== "") {
      setCurrency(curr);
    }
  };

  const sortingHandler = (sort) => {
    if (sort !== "") {
      setSort(sort);
    }
  };

  const onFavToggle = (fav) => {
    if (favourites.includes(fav)) {
      let newFavourites = [...favourites];
      let index = newFavourites.indexOf(fav);
      if (index !== -1) {
        newFavourites.splice(index, 1);
      }
      setFavs(newFavourites);
    } else {
      let newFavourites = [...favourites, fav];
      setFavs(newFavourites);
    }
  };

  let sortedCoins = [...coins];
  switch(sortBy) {
    case 'market_cap':
      sortedCoins = coins.sort((a,b) => (a.market_cap < b.market_cap ? 1: -1));
      break;
    case 'name_asc':
      sortedCoins = coins.sort((a,b) => (a.name > b.name ? 1: -1));
      break;
    case 'name_desc':
      sortedCoins = coins.sort((a,b) => (a.name < b.name ? 1: -1));
      break;
    case 'price_asc':
      sortedCoins = coins.sort((a,b) => (a.current_price > b.current_price ? 1: -1));
      break;
    case 'price_desc':
      sortedCoins = coins.sort((a,b) => (a.current_price < b.current_price ? 1: -1));
      break;
    case 'favourites':
      sortedCoins = coins.sort((a,b) => {
        if (favourites.includes(a.symbol)){
          return -1;
        } else if (favourites.includes(b.symbol)){
          return 1;
        } else return 0;
      });
      break
    default:
      break;
  }

  filteredCoins = sortedCoins.filter((coin) => {
    if (coin !== "") {
      return coin.name.toLowerCase().includes(search.toLowerCase());
    }

    return 0
  });

  return (
    <div>
      <Navbar
        onSearchInput={searchHandler}
        onCurrencyChange={currencyHandler}
        onSortChange={sortingHandler}
      />
      <div className="crypto-container">
        {filteredCoins.map((coin) => {
          return (
            <Coin
              onFavToggle={onFavToggle}
              favourites={favourites}
              key={coin.id}
              id={coin.id}
              curr={currencyMapping[currency]}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              price={coin.current_price}
              volume={coin.market_cap}
              todaysHigh={coin.high_24h}
              todaysLow={coin.low_24h}
              ath={coin.ath}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
