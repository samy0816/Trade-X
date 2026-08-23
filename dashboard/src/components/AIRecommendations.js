
import React, { useState } from "react";
import axios from "axios";
import './AIRecommendations.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { cleanAiText } from '../utils/aiText';

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3002'
  : 'https://trade-x-iaaz.onrender.com';


// Parse model output into { summary: string, recs: string[] }
const parseModelOutput = (text) => {
  const result = { summary: "", recs: [] };
  if (!text) return result;

  // Normalize Markdown heading/number/bullet artifacts so labels like
  // "### 1) SUMMARY", "**SUMMARY:**" or "SUMMARY:" all match.
  const cleanText = text
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/^\s*\d+[.)]\s*/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/\*\*/g, '');

  // Find SUMMARY: and RECOMMENDATIONS: blocks (colon optional)
  const summaryMatch = cleanText.match(/(?:^|\n)\s*SUMMARY\s*:?\s*([\s\S]*?)(?=\n\s*RECOMMENDATIONS\s*:?|$)/i);
  if (summaryMatch) {
    result.summary = summaryMatch[1].trim().replace(/\n+/g, ' ');
  }

  const recMatch = cleanText.match(/(?:^|\n)\s*RECOMMENDATIONS\s*:?\s*([\s\S]*)/i);
  if (recMatch) {
    // split lines, keep non-empty, take up to 3
    const lines = recMatch[1]
      .split(/\n|\r/)
      .map(l => l.replace(/^[-\d\.\)\s]*/, '').trim())
      .filter(Boolean)
      .slice(0,3);
    result.recs = lines;
  }

  // Fallback: if no labeled sections, derive the first paragraph as summary and top 3 lines as recs
  if (!result.summary) {
    const para = cleanText.split('\n\n')[0] || cleanText.split('\n')[0];
    result.summary = (para || '').trim();
  }
  if (result.recs.length === 0) {
    const lines = cleanText
      .split(/\n|\r/)
      .map(l => l.trim())
      .filter(Boolean)
      .slice(0,3);
    result.recs = lines;
  }

  return result;
};

const AIRecommendations = ({ holdings, watchlist = [] }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [summary, setSummary] = useState("");

  const fetchRecommendations = async () => {
    setLoading(true);
    setError("");
    setRecommendations([]);
    setSummary("");
    try {
      const res = await axios.post(`${API_BASE_URL}/ai/recommendations`, { holdings, watchlist });
      const parsed = parseModelOutput(res.data.recommendations || '');
      setSummary(parsed.summary);
      setRecommendations(parsed.recs);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch AI recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-card">
      <div className="ai-header">
        <div className="ai-title">
          <div className="ai-badge">AI</div>
          <div>
            <div style={{fontSize:14,fontWeight:700}}>AI Recommendations</div>
            <div className="small-muted">Concise summary + short actionable points</div>
          </div>
        </div>

        <div className="ai-actions">
          <button className="btn btn-ghost" onClick={() => { 
            setSummary(''); 
            setRecommendations([]); 
            setError(''); 
            setLoading(false);
          }}>Clear</button>
          <button className="btn btn-primary" onClick={fetchRecommendations}>Get Recommendations</button>
        </div>
      </div>

      {loading && <div className="loading">Generating recommendations…</div>}
      {error && <div style={{color:'#dc2626',marginTop:12}}>{error}</div>}

      {(summary || recommendations.length > 0) && (
        <div>
          {summary && <div className="ai-summary">{cleanAiText(summary)}</div>}

          {recommendations.length > 0 && (
            <div className="ai-list">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="ai-item">
                  <div className="dot" />
                  <div style={{flex:1}}>{cleanAiText(rec)}</div>
                </div>
              ))}

              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
                <div className="small-muted">Short, actionable recommendations</div>
                <CopyToClipboard text={(summary + '\n' + recommendations.join('\n')) || ''}>
                  <button className="copy-btn">Copy</button>
                </CopyToClipboard>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
