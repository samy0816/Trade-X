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
    <div className="summary-page">
      <header className="summary-hero">
        <span className="hero-label">Portfolio overview</span>
        <h1 className="hero-greeting">Hi, User!</h1>

        <div className="hero-portfolio">
          <div className="hero-value">
            <span className="hero-value-label">Current value</span>
            <span className="hero-amount">{fmt(totalCurrent)}</span>
          </div>
          <div className={`hero-pnl ${totalPnL >= 0 ? "positive" : "negative"}`}>
            <span className="hero-pnl-label">Unrealised P&amp;L</span>
            <span className="hero-pnl-amount">
              {totalPnL >= 0 ? "+" : "-"}
              {fmt(Math.abs(totalPnL))}
            </span>
            <span className="hero-pnl-pct">
              {totalPnL >= 0 ? "+" : "-"}
              {Math.abs(pnlPercent)}%
            </span>
          </div>
        </div>
      </header>

      <div className="metric-grid">
        <div className="metric-card metric-card--accent">
          <span className="metric-label">Margin available</span>
          <span className="metric-value">3.74k</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Investment</span>
          <span className="metric-value">{fmt(totalInvestment)}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Margins used</span>
          <span className="metric-value">0</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Opening balance</span>
          <span className="metric-value">3.74k</span>
        </div>
      </div>

      <div className="section-card">
        <div className="section-card-head">
          <span>Holdings ({allHoldings.length})</span>
          <span className={`pill ${totalPnL >= 0 ? "pill-green" : "pill-red"}`}>
            {totalPnL >= 0 ? "+" : "-"}
            {Math.abs(pnlPercent)}%
          </span>
        </div>

        {allHoldings.length > 0 ? (
          <div className="holdings-list">
            {allHoldings.map((stock, idx) => {
              const pnl = (stock.price - stock.avg) * stock.qty;
              return (
                <div className="holding-row" key={idx}>
                  <span className="holding-name">{stock.name}</span>
                  <span className="holding-qty">{stock.qty}</span>
                  <span className="holding-ltp">{stock.price.toFixed(2)}</span>
                  <span
                    className={`holding-pnl ${pnl >= 0 ? "positive" : "negative"}`}
                  >
                    {pnl >= 0 ? "+" : "-"}
                    {Math.abs(pnl).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="holdings-empty">No holdings yet.</div>
        )}
      </div>

      <MarketSentimentAnalyzer holdings={allHoldings} watchlist={watchlist} />
    </div>
  );
};

export default Summary;
