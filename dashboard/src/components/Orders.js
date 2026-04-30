import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("https://trade-x-iaaz.onrender.com/allOrders")
      .then((res) => {
        setAllOrders(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load orders. Is the backend running?");
        setLoading(false);
      });
  }, []);

  return (
    <div className="orders">
      {loading ? (
        <div style={{padding:'16px',color:'#555'}}>Loading orders…</div>
      ) : error ? (
        <div style={{padding:'16px',color:'#dc2626'}}>{error} <button onClick={() => window.location.reload()}>Retry</button></div>
      ) : allOrders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <>
          <h3 className="title">Orders ({allOrders.length})</h3>
          <div className="order-table">
            <table>
              <thead>
              <tr>
                <th>Name</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Mode</th>
              </tr>
              </thead>
              <tbody>
              {allOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{order.price}</td>
                  <td className={order.mode === 'BUY' ? 'buy-mode' : 'sell-mode'}>
                    {order.mode}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;