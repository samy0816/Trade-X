import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-2 text-center">
          We pioneered the discount broking model globally
          <br />
          Now, we are breaking ground with our technology.
        </h1>
      </div>

      <div
        className="row p-5 mt-5 border-top text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-5">
          <p>
            We kick-started operations with the goal of breaking all barriers 
            that traders and investors face worldwide in terms of cost, support, 
            and technology. We named the company TradEx, combining Trade and 
            Excellence to represent our commitment to superior trading experiences.
          </p>
          <p>
            Today, our disruptive pricing models and in-house technology have
            made us one of the leading stock brokers globally.
          </p>
          <p>
            Over 1+ Million clients place millions of orders every day through our
            powerful ecosystem of investment platforms, contributing significantly 
            to global retail trading volumes across multiple markets.
          </p>
        </div>
        <div className="col-6 p-5">
          <p>
            In addition, we run a number of popular open online educational and
            community initiatives to empower retail traders and investors worldwide.
          </p>
          <p>
            <a href="" style={{ textDecoration: "none" }}>
              TradeFund
            </a>
            , our fintech fund and incubator, has invested in several fintech
            startups with the goal of growing global capital markets and making
            trading accessible to everyone.
          </p>
          <p>
            And yet, we are always up to something new every day. Catch up on
            the latest updates on our blog or see what the media is saying about
            us across international markets.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;