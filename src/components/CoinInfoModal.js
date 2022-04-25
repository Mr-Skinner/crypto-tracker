import "./CoinInfoModal.css";

import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

function CoinInfoModal(props) {
    const closeModal = (e) => {
        props.onCloseModal();
    };

    let accentClr = getComputedStyle(document.querySelector(':root')).getPropertyValue('--accent-clr')
    const graphData = {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
            label: props.name + ' performance',
            borderColor: accentClr,
            backgroundColor: accentClr,
            data: [101.35,97.85,104.15,107.97,106.41,100.50,98.74,96.44,70.55,81.35,91.95,100.65]
        }]
    }

    return (
        <div className="modal-backdrop">
            <div className="coin-info-card">
                <div className="card-actions">
                    <span className="card-action-btn" onClick={closeModal}>
                        <i className="bi bi-x-lg"></i>
                    </span>
                </div>
                <div className="coin-info-wrapper">
                    <div className="coin-info-left">
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
                            <p>
                                {props.curr} {props.price.toLocaleString("en-UK")}
                            </p>
                            </div>
                            <div className="coin-stats">
                            <p>All Time High: </p>
                            <p>
                                {props.curr} {props.ath.toLocaleString("en-UK")}
                            </p>
                            </div>
                            <div className="coin-stats">
                            <p>24 High: </p>
                            <p>
                                {props.curr} {props.todaysHigh.toLocaleString("en-UK")}
                            </p>
                            </div>
                            <div className="coin-stats">
                            <p>24 Low: </p>
                            <p>
                                {props.curr} {props.todaysLow.toLocaleString("en-UK")}
                            </p>
                            </div>
                            <div className="coin-stats">
                            <p>Market Cap: </p>
                            <p>{props.volume.toLocaleString("en-UK")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="coin-info-right">
                        <Line data={graphData}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CoinInfoModal