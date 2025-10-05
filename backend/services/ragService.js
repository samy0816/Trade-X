const fetch = require('node-fetch');

// Knowledge base for RAG - This would typically come from a vector database
const tradingKnowledgeBase = {
  sectors: {
    technology: {
      description: "Technology sector includes software, hardware, and IT services companies",
      trends: "AI adoption, cloud computing, cybersecurity growth",
      risks: "Regulatory changes, market saturation, high valuations",
      examples: ["AAPL", "MSFT", "GOOGL", "NVDA"]
    },
    healthcare: {
      description: "Healthcare sector includes pharmaceuticals, biotech, and medical devices",
      trends: "Aging population, breakthrough therapies, digital health",
      risks: "Regulatory approval delays, patent cliffs, high R&D costs",
      examples: ["JNJ", "PFE", "UNH", "ABBV"]
    },
    finance: {
      description: "Financial sector includes banks, insurance, and investment services",
      trends: "Digital banking, fintech disruption, interest rate sensitivity",
      risks: "Credit losses, regulatory changes, economic cycles",
      examples: ["JPM", "BAC", "WFC", "GS"]
    },
    energy: {
      description: "Energy sector includes oil, gas, renewable energy companies",
      trends: "Green energy transition, ESG investing, volatility",
      risks: "Commodity price swings, environmental regulations, stranded assets",
      examples: ["XOM", "CVX", "COP", "EOG"]
    }
  },
  
  strategies: {
    diversification: {
      principle: "Don't put all eggs in one basket",
      implementation: "Spread investments across sectors, asset classes, and geographies",
      benefits: "Reduces portfolio risk and volatility"
    },
    valueInvesting: {
      principle: "Buy undervalued companies with strong fundamentals",
      implementation: "Look for low P/E ratios, strong balance sheets, consistent earnings",
      benefits: "Long-term wealth building with margin of safety"
    },
    growthInvesting: {
      principle: "Invest in companies with high growth potential",
      implementation: "Focus on revenue growth, market expansion, innovation",
      benefits: "Higher returns potential but with increased risk"
    },
    dollarCostAveraging: {
      principle: "Invest fixed amounts regularly regardless of market conditions",
      implementation: "Systematic investment plans, monthly contributions",
      benefits: "Reduces timing risk and emotional decision making"
    }
  },
  
  riskManagement: {
    stopLoss: "Set predetermined exit points to limit losses",
    positionSizing: "Never risk more than 2-3% of portfolio on single trade",
    diversification: "Spread risk across multiple assets and sectors",
    timeHorizon: "Match investments to your time horizon and goals"
  },
  
  marketIndicators: {
    pe_ratio: "Price-to-Earnings ratio indicates if stock is overvalued or undervalued",
    volume: "High volume confirms price movements and trends",
    moving_averages: "50-day and 200-day moving averages show trend direction",
    volatility: "VIX measures market fear and uncertainty"
  }
};

// Market sentiment data (in real app, this would come from news APIs)
const marketSentiment = {
  current: "cautiously optimistic",
  factors: [
    "Fed policy uncertainty",
    "Inflation concerns easing",
    "Strong corporate earnings",
    "Geopolitical tensions"
  ],
  sectorRotation: "Technology to Value stocks"
};

// Function to retrieve relevant context based on query
function retrieveRelevantContext(query, holdings, watchlist) {
  const context = {
    knowledge: [],
    marketData: [],
    portfolioInsights: []
  };
  
  // Extract sectors from holdings and watchlist
  const userStocks = [...(holdings || []), ...(watchlist || [])];
  const sectors = new Set();
  
  // Simple sector mapping (in real app, use stock API)
  const sectorMapping = {
    'BHARTIARTL': 'technology',
    'HDFCBANK': 'finance',
    'WIPRO': 'technology',
    'RELIANCE': 'energy',
    'TCS': 'technology',
    'INFY': 'technology',
    'ICICIBANK': 'finance',
    'SBIN': 'finance',
    'ITC': 'consumer',
    'HINDUNILVR': 'consumer'
  };
  
  userStocks.forEach(stock => {
    const stockName = typeof stock === 'string' ? stock : stock.name;
    if (sectorMapping[stockName]) {
      sectors.add(sectorMapping[stockName]);
    }
  });
  
  // Add relevant sector knowledge
  sectors.forEach(sector => {
    if (tradingKnowledgeBase.sectors[sector]) {
      context.knowledge.push({
        type: 'sector',
        sector: sector,
        data: tradingKnowledgeBase.sectors[sector]
      });
    }
  });
  
  // Add strategy recommendations
  context.knowledge.push({
    type: 'strategies',
    data: tradingKnowledgeBase.strategies
  });
  
  // Add risk management principles
  context.knowledge.push({
    type: 'riskManagement',
    data: tradingKnowledgeBase.riskManagement
  });
  
  // Add market sentiment
  context.marketData.push({
    type: 'sentiment',
    data: marketSentiment
  });
  
  // Portfolio analysis
  if (holdings && holdings.length > 0) {
    const totalValue = holdings.reduce((sum, h) => sum + (h.price * h.qty), 0);
    const profitableHoldings = holdings.filter(h => h.net && !h.net.includes('-'));
    
    context.portfolioInsights.push({
      totalHoldings: holdings.length,
      totalValue: totalValue,
      profitablePositions: profitableHoldings.length,
      diversification: sectors.size,
      sectors: Array.from(sectors)
    });
  }
  
  return context;
}

// Enhanced prompt with RAG context
function buildRAGPrompt(query, context, holdings, watchlist) {
  let prompt = `You are an expert financial advisor with access to comprehensive market knowledge and portfolio analysis capabilities.

MARKET CONTEXT:
Current Market Sentiment: ${context.marketData[0]?.data.current}
Key Market Factors: ${context.marketData[0]?.data.factors.join(', ')}

PORTFOLIO ANALYSIS:`;

  if (context.portfolioInsights.length > 0) {
    const insights = context.portfolioInsights[0];
    prompt += `
- Total Holdings: ${insights.totalHoldings}
- Sector Diversification: ${insights.diversification} sectors (${insights.sectors.join(', ')})
- Profitable Positions: ${insights.profitablePositions}/${insights.totalHoldings}`;
  }

  prompt += `

RELEVANT KNOWLEDGE BASE:`;

  // Add sector-specific knowledge
  context.knowledge.forEach(item => {
    if (item.type === 'sector') {
      prompt += `
${item.sector.toUpperCase()} SECTOR:
- Overview: ${item.data.description}
- Current Trends: ${item.data.trends}
- Key Risks: ${item.data.risks}`;
    }
  });

  prompt += `

INVESTMENT STRATEGIES:
- Value Investing: ${tradingKnowledgeBase.strategies.valueInvesting.principle}
- Growth Investing: ${tradingKnowledgeBase.strategies.growthInvesting.principle}
- Diversification: ${tradingKnowledgeBase.strategies.diversification.principle}

RISK MANAGEMENT PRINCIPLES:
- Stop Loss: ${tradingKnowledgeBase.riskManagement.stopLoss}
- Position Sizing: ${tradingKnowledgeBase.riskManagement.positionSizing}

USER'S CURRENT PORTFOLIO:
Holdings: ${JSON.stringify(holdings, null, 2)}
Watchlist: ${JSON.stringify(watchlist, null, 2)}

Based on this comprehensive analysis and knowledge base, provide:

1) MARKET_INSIGHT: One paragraph analyzing current market conditions and their impact on the user's portfolio
2) STRATEGIC_RECOMMENDATIONS: 3-4 specific, actionable recommendations based on the knowledge base
3) RISK_ASSESSMENT: Brief assessment of portfolio risks and mitigation strategies
4) SECTOR_ANALYSIS: Analysis of sector exposure and rebalancing suggestions

Format your response with clear sections and be specific with stock symbols and percentages where relevant.`;

  return prompt;
}

// Main RAG-enhanced recommendation function
async function getRAGEnhancedRecommendations(holdings, watchlist, query = 'portfolio analysis') {
  try {
    // Retrieve relevant context using RAG
    const context = retrieveRelevantContext(query, holdings, watchlist);
    
    // Build enhanced prompt with retrieved knowledge
    const prompt = buildRAGPrompt(query, context, holdings, watchlist);
    
    // Call Gemini API with enhanced prompt
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('No API key found. Available env vars:', Object.keys(process.env).filter(key => key.includes('API') || key.includes('GEMINI')));
      return generateFallbackRecommendations(context, holdings, watchlist);
    }
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    
    if (!response.ok) {
      console.error('API Response not OK:', response.status, response.statusText);
      return generateFallbackRecommendations(context, holdings, watchlist);
    }
    
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No recommendation received.";
    
    return {
      recommendations: text,
      context: context,
      knowledgeUsed: context.knowledge.length,
      sectorsAnalyzed: context.portfolioInsights[0]?.sectors || []
    };
    
  } catch (error) {
    console.error('RAG Enhancement Error:', error.message);
    const context = retrieveRelevantContext(query, holdings, watchlist);
    return generateFallbackRecommendations(context, holdings, watchlist);
  }
}

// Generate fallback recommendations using knowledge base
function generateFallbackRecommendations(context, holdings, watchlist) {
  let recommendations = "MARKET_INSIGHT: Based on your portfolio analysis using our knowledge base:\n\n";
  
  if (context.portfolioInsights.length > 0) {
    const insights = context.portfolioInsights[0];
    recommendations += `Your portfolio contains ${insights.totalHoldings} holdings across ${insights.diversification} sectors (${insights.sectors.join(', ')}). `;
    recommendations += `You have ${insights.profitablePositions} profitable positions out of ${insights.totalHoldings} total holdings.\n\n`;
  }
  
  recommendations += "STRATEGIC_RECOMMENDATIONS:\n";
  recommendations += "1. Consider diversifying across additional sectors to reduce risk\n";
  recommendations += "2. Review underperforming positions for potential rebalancing\n";
  recommendations += "3. Monitor market conditions for optimal entry/exit timing\n";
  recommendations += "4. Maintain appropriate position sizing relative to portfolio\n\n";
  
  recommendations += "RISK_ASSESSMENT: Your current portfolio shows sector concentration. ";
  recommendations += "Consider implementing stop-loss orders and maintaining 2-3% maximum position sizing.\n\n";
  
  recommendations += "SECTOR_ANALYSIS: Based on current market conditions, consider rebalancing ";
  recommendations += "between growth and value stocks according to your risk tolerance.";
  
  return {
    recommendations: recommendations,
    context: context,
    knowledgeUsed: context.knowledge.length,
    sectorsAnalyzed: context.portfolioInsights[0]?.sectors || []
  };
}

module.exports = {
  getRAGEnhancedRecommendations,
  retrieveRelevantContext,
  tradingKnowledgeBase
};