import React, { useState } from 'react';
import axios from 'axios';
import './SmartTradeAdvisor.css';

// API Configuration
const apiConfig = {
  API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3002'  // Local development
    : 'https://trade-x-iaaz.onrender.com',  // Production
  endpoints: {
    tradeAnalysis: '/ai/trade-analysis'
  }
};

const SmartTradeAdvisor = ({ currentStock, userHoldings = [] }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tradeType, setTradeType] = useState("BUY");

  const analyzeTradeOpportunity = async () => {
    if (!currentStock) {
      setError("Please select a stock to analyze");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      // Create comprehensive trade analysis prompt
      const prompt = `Act as an expert trading advisor. Analyze ${currentStock} for a ${tradeType} decision.

Current User Portfolio: ${JSON.stringify(userHoldings)}

Provide analysis in this structured format:

TRADE_SIGNAL: [Strong Buy/Buy/Hold/Sell/Strong Sell] with confidence score (1-10)
ENTRY_STRATEGY: Optimal entry points and timing
RISK_ANALYSIS: Key risks and risk mitigation strategies  
POSITION_SIZING: Recommended position size as % of portfolio
STOP_LOSS: Suggested stop-loss levels
PROFIT_TARGETS: Target price levels for profit taking
MARKET_CONTEXT: How current market conditions affect this trade
PORTFOLIO_IMPACT: How this trade affects overall portfolio balance

Be specific with price levels, percentages, and actionable advice. Consider technical analysis, fundamental factors, and portfolio diversification.`;

      // Use backend endpoint instead of direct API call
      const response = await axios.post(`${apiConfig.API_BASE_URL}${apiConfig.endpoints.tradeAnalysis}`, {
        stock: currentStock,
        tradeType: tradeType,
        userPortfolio: userHoldings
      });
      
      const text = response.data.analysis || "Analysis not available.";
      parseTradeAnalysis(text);
      
    } catch (err) {
      setError("Failed to analyze trade opportunity.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const parseTradeAnalysis = (text) => {
    const analysisData = {
      signal: "Hold",
      confidence: 5,
      entryStrategy: "",
      riskAnalysis: "",
      positionSizing: "",
      stopLoss: "",
      profitTargets: "",
      marketContext: "",
      portfolioImpact: "",
      rawText: text
    };

    // Parse trade signal
    const signalMatch = text.match(/TRADE_SIGNAL:\s*([\s\S]*?)(?:\n\s*ENTRY_STRATEGY:|$)/i);
    if (signalMatch) {
      const signalText = signalMatch[1].trim();
      if (signalText.toLowerCase().includes('strong buy')) analysisData.signal = "Strong Buy";
      else if (signalText.toLowerCase().includes('buy')) analysisData.signal = "Buy";
      else if (signalText.toLowerCase().includes('strong sell')) analysisData.signal = "Strong Sell";
      else if (signalText.toLowerCase().includes('sell')) analysisData.signal = "Sell";
      
      const confidenceMatch = signalText.match(/(\d+)/);
      if (confidenceMatch) {
        analysisData.confidence = parseInt(confidenceMatch[1]);
      }
    }

    // Parse other sections
    const sections = [
      'ENTRY_STRATEGY', 'RISK_ANALYSIS', 'POSITION_SIZING', 
      'STOP_LOSS', 'PROFIT_TARGETS', 'MARKET_CONTEXT', 'PORTFOLIO_IMPACT'
    ];

    sections.forEach((section, index) => {
      const nextSection = sections[index + 1];
      const regex = new RegExp(`${section}:\\s*([\\s\\S]*?)(?:\\n\\s*${nextSection}:|$)`, 'i');
      const match = text.match(regex);
      if (match) {
        const key = section.toLowerCase().replace('_', '');
        if (key === 'entrystrategy') analysisData.entryStrategy = match[1].trim();
        else if (key === 'riskanalysis') analysisData.riskAnalysis = match[1].trim();
        else if (key === 'positionsizing') analysisData.positionSizing = match[1].trim();
        else if (key === 'stoploss') analysisData.stopLoss = match[1].trim();
        else if (key === 'profittargets') analysisData.profitTargets = match[1].trim();
        else if (key === 'marketcontext') analysisData.marketContext = match[1].trim();
        else if (key === 'portfolioimpact') analysisData.portfolioImpact = match[1].trim();
      }
    });

    setAnalysis(analysisData);
  };

  const getSignalColor = (signal) => {
    switch (signal) {
      case 'Strong Buy': return '#4caf50';
      case 'Buy': return '#8bc34a';
      case 'Strong Sell': return '#f44336';
      case 'Sell': return '#ff9800';
      default: return '#2196f3';
    }
  };

  const getSignalIcon = (signal) => {
    switch (signal) {
      case 'Strong Buy': return '🚀';
      case 'Buy': return '📈';
      case 'Strong Sell': return '🔻';
      case 'Sell': return '📉';
      default: return '⏸️';
    }
  };

  return (
    <div className="smart-trade-advisor">
      <div className="advisor-header">
        <div className="advisor-title">
          <span className="advisor-icon">🎯</span>
          <div>
            <h3>Smart Trade Advisor</h3>
            <p>AI-powered trade analysis and recommendations</p>
          </div>
        </div>
      </div>

      <div className="trade-inputs">
        <div className="input-group">
          <label>Stock Symbol</label>
          <input 
            type="text" 
            value={currentStock || ''} 
            placeholder="Enter stock symbol (e.g., BHARTIARTL)"
            readOnly
          />
        </div>
        
        <div className="input-group">
          <label>Trade Type</label>
          <select value={tradeType} onChange={(e) => setTradeType(e.target.value)}>
            <option value="BUY">Buy Analysis</option>
            <option value="SELL">Sell Analysis</option>
          </select>
        </div>

        <button 
          className="analyze-btn" 
          onClick={analyzeTradeOpportunity}
          disabled={loading || !currentStock}
        >
          {loading ? '🔄 Analyzing...' : '🔍 Analyze Trade'}
        </button>
      </div>

      {error && (
        <div className="advisor-error">
          <span>❌ {error}</span>
        </div>
      )}

      {loading && (
        <div className="advisor-loading">
          <div className="loading-pulse"></div>
          <span>Analyzing trade opportunity...</span>
        </div>
      )}

      {analysis && !loading && (
        <div className="analysis-results">
          {/* Trade Signal */}
          <div className="trade-signal">
            <div className="signal-header">
              <span className="signal-icon">{getSignalIcon(analysis.signal)}</span>
              <div>
                <h4 style={{ color: getSignalColor(analysis.signal) }}>
                  {analysis.signal}
                </h4>
                <div className="confidence-bar">
                  <div 
                    className="confidence-fill"
                    style={{ 
                      width: `${analysis.confidence * 10}%`,
                      backgroundColor: getSignalColor(analysis.signal)
                    }}
                  ></div>
                  <span>Confidence: {analysis.confidence}/10</span>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Sections */}
          <div className="analysis-grid">
            {analysis.entryStrategy && (
              <div className="analysis-card entry">
                <h5>🎯 Entry Strategy</h5>
                <p>{analysis.entryStrategy}</p>
              </div>
            )}

            {analysis.riskAnalysis && (
              <div className="analysis-card risk">
                <h5>⚠️ Risk Analysis</h5>
                <p>{analysis.riskAnalysis}</p>
              </div>
            )}

            {analysis.positionSizing && (
              <div className="analysis-card position">
                <h5>💰 Position Sizing</h5>
                <p>{analysis.positionSizing}</p>
              </div>
            )}

            {analysis.stopLoss && (
              <div className="analysis-card stop-loss">
                <h5>🛡️ Stop Loss</h5>
                <p>{analysis.stopLoss}</p>
              </div>
            )}

            {analysis.profitTargets && (
              <div className="analysis-card profit">
                <h5>🎯 Profit Targets</h5>
                <p>{analysis.profitTargets}</p>
              </div>
            )}

            {analysis.marketContext && (
              <div className="analysis-card market">
                <h5>📊 Market Context</h5>
                <p>{analysis.marketContext}</p>
              </div>
            )}

            {analysis.portfolioImpact && (
              <div className="analysis-card portfolio">
                <h5>📈 Portfolio Impact</h5>
                <p>{analysis.portfolioImpact}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="advisor-actions">
            <button 
              className="copy-analysis-btn"
              onClick={() => navigator.clipboard.writeText(analysis.rawText)}
            >
              📋 Copy Analysis
            </button>
            <button 
              className="save-analysis-btn"
              onClick={() => {
                const blob = new Blob([analysis.rawText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `trade-analysis-${currentStock}-${new Date().toISOString().split('T')[0]}.txt`;
                a.click();
              }}
            >
              💾 Save Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartTradeAdvisor;