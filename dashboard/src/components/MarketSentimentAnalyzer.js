import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MarketSentimentAnalyzer.css';

// API Configuration
const apiConfig = {
  API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3002'  // Local development
    : 'https://trade-x-iaaz.onrender.com',  // Production
  endpoints: {
    marketSentiment: '/ai/market-sentiment'
  }
};

const MarketSentimentAnalyzer = ({ holdings, watchlist }) => {
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMarketSentiment = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Create a prompt for market sentiment analysis
      const userStocks = [...(holdings || []), ...(watchlist || [])];
      const stockNames = userStocks.map(stock => typeof stock === 'string' ? stock : stock.name);
      
      const prompt = `Analyze the current market sentiment for these stocks: ${stockNames.join(', ')}
      
      Provide analysis in this format:
      OVERALL_SENTIMENT: [Bullish/Bearish/Neutral] with confidence percentage
      KEY_DRIVERS: List 3-4 main market factors affecting sentiment
      STOCK_SPECIFIC: Brief sentiment for each stock mentioned
      RECOMMENDATION: Overall market timing recommendation
      
      Keep it concise and actionable.`;
      
      // Use backend endpoint instead of direct API call
      const response = await axios.post(`${apiConfig.API_BASE_URL}${apiConfig.endpoints.marketSentiment}`, {
        stocks: stockNames
      });
      
      const text = response.data.sentiment || "No sentiment data available.";
      parseSentimentResponse(text);
      
    } catch (err) {
      setError("Failed to fetch market sentiment.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const parseSentimentResponse = (text) => {
    const sentimentData = {
      overall: "Neutral",
      confidence: 50,
      drivers: [],
      stockSpecific: "",
      recommendation: "",
      rawText: text
    };

    // Parse overall sentiment
    const overallMatch = text.match(/OVERALL_SENTIMENT:\s*([\s\S]*?)(?:\n\s*KEY_DRIVERS:|$)/i);
    if (overallMatch) {
      const sentimentText = overallMatch[1].trim();
      if (sentimentText.toLowerCase().includes('bullish')) sentimentData.overall = "Bullish";
      else if (sentimentText.toLowerCase().includes('bearish')) sentimentData.overall = "Bearish";
      
      const confidenceMatch = sentimentText.match(/(\d+)%/);
      if (confidenceMatch) {
        sentimentData.confidence = parseInt(confidenceMatch[1]);
      }
    }

    // Parse key drivers
    const driversMatch = text.match(/KEY_DRIVERS:\s*([\s\S]*?)(?:\n\s*STOCK_SPECIFIC:|$)/i);
    if (driversMatch) {
      sentimentData.drivers = driversMatch[1]
        .split(/\n/)
        .filter(line => line.trim())
        .map(line => line.replace(/^[-\d\.\)\s]*/, '').trim())
        .filter(Boolean)
        .slice(0, 4);
    }

    // Parse stock specific
    const stockMatch = text.match(/STOCK_SPECIFIC:\s*([\s\S]*?)(?:\n\s*RECOMMENDATION:|$)/i);
    if (stockMatch) {
      sentimentData.stockSpecific = stockMatch[1].trim();
    }

    // Parse recommendation
    const recMatch = text.match(/RECOMMENDATION:\s*([\s\S]*)/i);
    if (recMatch) {
      sentimentData.recommendation = recMatch[1].trim();
    }

    setSentiment(sentimentData);
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'Bullish': return '#4caf50';
      case 'Bearish': return '#f44336';
      default: return '#ff9800';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'Bullish': return '📈';
      case 'Bearish': return '📉';
      default: return '📊';
    }
  };

  useEffect(() => {
    if (holdings && holdings.length > 0) {
      fetchMarketSentiment();
    }
  }, [holdings, watchlist]);

  return (
    <div className="market-sentiment-analyzer">
      <div className="sentiment-header">
        <div className="sentiment-title">
          <span className="sentiment-icon">🎯</span>
          <div>
            <h3>Market Sentiment Analysis</h3>
            <p>AI-powered market mood assessment</p>
          </div>
        </div>
        
        <button 
          className="refresh-btn" 
          onClick={fetchMarketSentiment}
          disabled={loading}
        >
          {loading ? '🔄' : '🔁'} Refresh
        </button>
      </div>

      {loading && (
        <div className="sentiment-loading">
          <div className="pulse-loader"></div>
          <span>Analyzing market sentiment...</span>
        </div>
      )}

      {error && (
        <div className="sentiment-error">
          <span>❌ {error}</span>
        </div>
      )}

      {sentiment && !loading && (
        <div className="sentiment-results">
          {/* Overall Sentiment */}
          <div className="overall-sentiment">
            <div className="sentiment-gauge">
              <div 
                className="gauge-fill" 
                style={{ 
                  width: `${sentiment.confidence}%`,
                  backgroundColor: getSentimentColor(sentiment.overall)
                }}
              ></div>
              <div className="gauge-label">
                <span className="sentiment-emoji">
                  {getSentimentIcon(sentiment.overall)}
                </span>
                <span className="sentiment-text">
                  {sentiment.overall} ({sentiment.confidence}%)
                </span>
              </div>
            </div>
          </div>

          {/* Key Drivers */}
          {sentiment.drivers.length > 0 && (
            <div className="sentiment-section">
              <h4>🔑 Key Market Drivers</h4>
              <div className="drivers-list">
                {sentiment.drivers.map((driver, idx) => (
                  <div key={idx} className="driver-item">
                    <span className="driver-bullet">•</span>
                    <span>{driver}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stock Specific Analysis */}
          {sentiment.stockSpecific && (
            <div className="sentiment-section">
              <h4>📈 Stock-Specific Sentiment</h4>
              <p>{sentiment.stockSpecific}</p>
            </div>
          )}

          {/* Recommendation */}
          {sentiment.recommendation && (
            <div className="sentiment-section recommendation">
              <h4>💡 Market Timing Recommendation</h4>
              <p><strong>{sentiment.recommendation}</strong></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MarketSentimentAnalyzer;