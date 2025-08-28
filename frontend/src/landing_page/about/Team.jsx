import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center ">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/images/Samarth.png"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-5">Samarth Joshi</h4>
          <h6>Designer</h6>
        </div>
        <div className="col-6 p-3">
          <p>
            Samarth Joshi is the co-founder and CTO of TradeX. He helped build
            much of the engineering that powers the trading platform this demo
            gently rebuilds — yes, this is a clone project and I'm not the real
            owner (just the person pretending to be bold enough to rebuild it).
          </p>
          <p>
            Zerodha has changed the landscape of the Indian broking industry —
            we're simply borrowing inspiration and calling it a learning
            exercise.
          </p>
          <p>
           I am a master's student studying computer science at the University of Saarland and have a great passion for design and development.
          </p>
          <p>Playing basketball is his zen. I, meanwhile, get my cardio from
            refreshing the app while debugging.</p>
          <p>
            Connect on <a href="">Homepage</a> / <a href="">TradingQnA</a> / <a href="">Twitter</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
