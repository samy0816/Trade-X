import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 border-bottom text-center">
        <h1>Pricing</h1>
        <h3 className="text-muted mt-3 fs-5">
          Free equity investments and flat €2.50 intraday and derivatives trades
        </h3>
      </div>
      <div className="row p-5 mt-5 text-center">
        <div className="col-4 p-4">
          <img src="media/images/pricingEquity.svg" />
          <h1 className="fs-3">Free equity delivery</h1>
          <p className="text-muted">
            All equity delivery investments (XETRA, Deutsche Börse), are absolutely free — €0 brokerage.
          </p>
        </div>
        <div className="col-4 p-4">
          <img src="media/images/intradayTrades.svg" />
          <h1 className="fs-3">Intraday and derivatives trades</h1>
          <p className="text-muted">
            Flat €2.50 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, forex, and commodity trades.
          </p>
        </div>
        <div className="col-4 p-4">
          <img src="media/images/pricingEquity.svg" />
          <h1 className="fs-3">Free direct funds</h1>
          <p className="text-muted">
            All direct fund investments are absolutely free — €0
            commissions & custody charges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;