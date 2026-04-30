import React, { useState, useEffect } from "react";
import axios from "axios";
import MarketSentimentAnalyzer from "./MarketSentimentAnalyzer";
import { watchlist } from "../data/data";

const Summary = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios.get("https://trade-x-iaaz.onrender.com/allHoldings").then((res) => {
      setAllHoldings(res.data);
    }).catch(() => {});
  }, []);

  // Compute totals from real data
  const totalInvestment = allHoldings.reduce((sum, s) => sum + s.avg * s.qty, 0);
  const totalCurrent = allHoldings.reduce((sum, s) => sum + s.price * s.qty, 0);
  const totalPnL = totalCurrent - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? ((totalPnL / totalInvestment) * 100).toFixed(2) : 0;
  const fmt = (n) => n >= 1000 ? (n / 1000).toFixed(2) + 'k' : n.toFixed(2);

  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({allHoldings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={totalPnL >= 0 ? "profit" : "loss"}>
              {fmt(Math.abs(totalPnL))} <small>{totalPnL >= 0 ? '+' : '-'}{Math.abs(pnlPercent)}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{fmt(totalCurrent)}</span>{" "}
            </p>
            <p>
              Investment <span>{fmt(totalInvestment)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <MarketSentimentAnalyzer holdings={allHoldings} watchlist={watchlist} />
    </>
  );
};

export default Summary;
