import React, { useState } from 'react';
import axios from 'axios';
import './RAGAIAnalyzer.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// API Configuration
const apiConfig = {
  API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3002'  // Local development
    : 'https://trade-x-iaaz.onrender.com',  // Production
  endpoints: {
    ragRecommendations: '/ai/rag-recommendations'
  }
};

// Parse RAG model output with enhanced sections
const parseRAGOutput = (text) => {
  const result = { 
    marketInsight: "", 
    strategicRecommendations: [], 
    riskAssessment: "",
    sectorAnalysis: "",
    rawText: text
  };
  
  if (!text) return result;

  // Convert escaped newlines to actual newlines for better parsing
  const cleanText = text.replace(/\\n/g, '\n').replace(/\\r/g, '');

  // Parse different sections
  const marketInsightMatch = cleanText.match(/MARKET_INSIGHT:\s*([\s\S]*?)(?:\n\s*STRATEGIC_RECOMMENDATIONS:|$)/i);
  if (marketInsightMatch) {
    result.marketInsight = marketInsightMatch[1].trim();
  }

  const strategicMatch = cleanText.match(/STRATEGIC_RECOMMENDATIONS:\s*([\s\S]*?)(?:\n\s*RISK_ASSESSMENT:|$)/i);
  if (strategicMatch) {
    const recs = strategicMatch[1]
      .split(/\n/)
      .filter(line => line.trim())
      .map(line => line.replace(/^[-\d\.\)\s]*/, '').trim())
      .filter(Boolean)
      .slice(0, 4);
    result.strategicRecommendations = recs;
  }

  const riskMatch = cleanText.match(/RISK_ASSESSMENT:\s*([\s\S]*?)(?:\n\s*SECTOR_ANALYSIS:|$)/i);
  if (riskMatch) {
    result.riskAssessment = riskMatch[1].trim();
  }

  const sectorMatch = cleanText.match(/SECTOR_ANALYSIS:\s*([\s\S]*)/i);
  if (sectorMatch) {
    result.sectorAnalysis = sectorMatch[1].trim();
  }

  return result;
};

const RAGAIAnalyzer = ({ holdings, watchlist = [] }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysisType, setAnalysisType] = useState("comprehensive");

  const fetchRAGAnalysis = async () => {
    setLoading(true);
    setError("");
    setAnalysis(null);
    
    try {
      const res = await axios.post(`${apiConfig.API_BASE_URL}${apiConfig.endpoints.ragRecommendations}`, { 
        holdings, 
        watchlist,
        query: analysisType
      });
      
      const parsed = parseRAGOutput(res.data.recommendations || '');
      setAnalysis({
        ...parsed,
        context: res.data.context,
        knowledgeUsed: res.data.knowledgeUsed,
        sectorsAnalyzed: res.data.sectorsAnalyzed
      });
    } catch (err) {
      setError("Failed to fetch RAG-enhanced analysis.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearAnalysis = () => {
    setAnalysis(null);
    setError("");
    setLoading(false);
  };

  return (
    <div className="rag-ai-analyzer">
      <div className="rag-header">
        <div className="rag-title">
         
          <div>
            <div className="title-text">Advanced Portfolio Analyzer</div>
            <div className="subtitle-text">Knowledge-enhanced AI with market intelligence</div>
          </div>
        </div>

        <div className="rag-controls">
          <select 
            value={analysisType} 
            onChange={(e) => setAnalysisType(e.target.value)}
            className="analysis-type-select"
          >
            <option value="comprehensive">Comprehensive Analysis</option>
            <option value="risk-focused">Risk Assessment</option>
            <option value="sector-analysis">Sector Analysis</option>
            <option value="growth-opportunities">Growth Opportunities</option>
          </select>
          
          <div className="rag-actions">
            <button className="btn btn-ghost" onClick={clearAnalysis}>Clear</button>
            <button className="btn btn-primary" onClick={fetchRAGAnalysis}>
              Analyze Portfolio
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Analyzing with knowledge base...</div>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {analysis && (
        <div className="analysis-results">
          {/* Knowledge Stats */}
          <div className="knowledge-stats">
            <div className="stat-item">
              <span className="stat-number">{analysis.knowledgeUsed}</span>
              <span className="stat-label">Knowledge Sources</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{analysis.sectorsAnalyzed?.length || 0}</span>
              <span className="stat-label">Sectors Analyzed</span>
            </div>
            <div className="stat-item">
              <span className="stat-badge">RAG</span>
              <span className="stat-label">Enhanced AI</span>
            </div>
          </div>

          {/* Market Insight */}
          {analysis.marketInsight && (
            <div className="analysis-section market-insight">
              <h3>📊 Market Insight</h3>
              <div className="insight-content">
                {analysis.marketInsight.split('\n').map((line, idx) => (
                  <p key={idx} className="insight-line">{line}</p>
                ))}
              </div>
            </div>
          )}

          {/* Strategic Recommendations */}
          {analysis.strategicRecommendations.length > 0 && (
            <div className="analysis-section strategic-recs">
              <h3>🎯 Strategic Recommendations</h3>
              <div className="recommendations-list">
                {analysis.strategicRecommendations.map((rec, idx) => (
                  <div key={idx} className="recommendation-item">
                    <div className="rec-number">{idx + 1}</div>
                    <div className="rec-text">{rec}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Risk Assessment */}
          {analysis.riskAssessment && (
            <div className="analysis-section risk-assessment">
              <h3>⚠️ Risk Assessment</h3>
              <div className="risk-content">
                {analysis.riskAssessment.split('\n').map((line, idx) => (
                  <p key={idx} className="risk-line">{line}</p>
                ))}
              </div>
            </div>
          )}

          {/* Sector Analysis */}
          {analysis.sectorAnalysis && (
            <div className="analysis-section sector-analysis">
              <h3>🏭 Sector Analysis</h3>
              <div className="sector-content">
                {analysis.sectorAnalysis.split('\n').map((line, idx) => (
                  <p key={idx} className="sector-line">{line}</p>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="analysis-actions">
            <CopyToClipboard text={analysis.rawText || ''}>
              <button className="copy-btn">Copy Full Analysis</button>
            </CopyToClipboard>
            <button className="export-btn" onClick={() => {
              const blob = new Blob([analysis.rawText], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `portfolio-analysis-${new Date().toISOString().split('T')[0]}.txt`;
              a.click();
            }}>
              Export Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RAGAIAnalyzer;