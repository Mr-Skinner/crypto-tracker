import { Dropdown, DropdownButton } from "react-bootstrap";
import { ExportDataToExcel } from "../ExportDataToExcel";
import "./Navbar.css";

function Navbar(props) {
  const fileName = "CryptoData";
  const searchCoin = (e) => {
    props.onSearchInput(e.target.value);
  };

  const switchCurrency = (e) => {
    props.onCurrencyChange(e.target.name);
  };

  const sortByHandler = (e) => {
    props.onSortChange(e.target.name);
  };

  return (
    <div className="banner">
      <div className="col-xs-4 title-container">
        <h1 className="app-title">Crypto Tracker</h1>
      </div>
      <div className="col-xs-8 actions-container">
        <input
          id="crypto-search"
          placeholder="Search"
          type="text"
          className="form-control"
          onChange={searchCoin}
        />
        <DropdownButton
          id="currency-dropdown"
          title="Currency"
          onClick={switchCurrency}
        >
          <Dropdown.Item href="" name="gbp">
            £
          </Dropdown.Item>
          <Dropdown.Item href="" name="usd">
            $
          </Dropdown.Item>
          <Dropdown.Item href="" name="eur">
            €
          </Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          id="sorting-dropdown"
          title="Sort by"
          onClick={sortByHandler}
        >
          <Dropdown.Item href="" name="market_cap">
            Market Cap
          </Dropdown.Item>
          <Dropdown.Item href="" name="top_movers">
            Top Movers
          </Dropdown.Item>
          <Dropdown.Item href="" name="name_asc">
            Name (Asc)
          </Dropdown.Item>
          <Dropdown.Item href="" name="name_desc">
            Name (Desc)
          </Dropdown.Item>
          <Dropdown.Item href="" name="price_asc">
            Price (Asc)
          </Dropdown.Item>
          <Dropdown.Item href="" name="price_desc">
            Price (Desc)
          </Dropdown.Item>
          <Dropdown.Item href="" name="favourites">
            Favourites
          </Dropdown.Item>
        </DropdownButton>
        <ExportDataToExcel apiData={props.coins} fileName={fileName} />
      </div>
    </div>
  );
}

export default Navbar;
