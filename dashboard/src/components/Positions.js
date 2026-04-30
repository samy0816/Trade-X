import React, { useState, useEffect } from "react";
import axios from "axios";

const Positions = () => {
   const [allPositions, setAllPositions] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

    useEffect(() => {
    axios.get("https://trade-x-iaaz.onrender.com/allPositions")
      .then((res) => {
        setAllPositions(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load positions. Is the backend running?");
        setLoading(false);
      });
    }, []);
  
  return (
    <>
      {loading && <div style={{padding:'16px',color:'#555'}}>Loading positions…</div>}
      {error && <div style={{padding:'16px',color:'#dc2626'}}>{error} <button onClick={() => window.location.reload()}>Retry</button></div>}
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>
          </thead>
          <tbody>

          {allPositions.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.product}</td>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;