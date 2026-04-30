import React, { useState, useEffect } from "react";
import axios from "axios";
import RAGAIAnalyzer from "./RAGAIAnalyzer";
import { watchlist as staticWatchlist } from "../data/data";
import "./Apps.css";

const Apps = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Dynamic API URL based on environment
    const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? 'http://localhost:3002'
      : 'https://trade-x-iaaz.onrender.com';
    
    // Fetch holdings data for the RAG analyzer
    axios.get(`${API_BASE_URL}/allHoldings`).then((res) => {
      setAllHoldings(res.data);
    }).catch(err => {
      console.error("Error fetching holdings:", err);
      setAllHoldings([]);
    });

    // Use real watchlist from data
    setWatchlist(staticWatchlist);
  }, []);

  return (
    <div className="apps-container">
      <div className="apps-header">
        <h1>Trading Apps & Analysis Tools</h1>
        <p>Advanced AI-powered portfolio analysis and trading insights</p>
      </div>
      
      <RAGAIAnalyzer holdings={allHoldings} watchlist={watchlist} />
    </div>
  );
};

export default Apps;
