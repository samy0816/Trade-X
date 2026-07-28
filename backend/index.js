require('dotenv').config();
const express= require("express");
const fetch = require('node-fetch');
const mongoose = require("mongoose");

const port = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const {HoldingsModel} = require("./model/HoldingsModel");
const {PositionsModel}=require("./model/PositionsMode");
const{OrdersModel}=require("./model/OrdersModel");

// Gemini AI HTTP API integration for gemini-2.0-flash

const bodyParser=require('body-parser');
const cors=require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { UserModel } = require('./model/UserModel');
const { getRAGEnhancedRecommendations } = require('./services/ragService');

// ── Demo / Fallback data (used when MongoDB is unreachable) ──
const demoUser = {
  id: 'demo-001',
  _id: 'demo-001',
  email: 'demo@tradex.dev',
  name: 'Demo User'
};

const demoHoldings = [
  { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
  { name: "HDFCBANK",  qty: 2, avg: 1383.40, price: 1522.35, net: "+10.04%", day: "+0.11%" },
  { name: "INFY",      qty: 1, avg: 1350.50, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
  { name: "TCS",       qty: 1, avg: 3041.70, price: 3194.80, net: "+5.03%", day: "-0.25%", isLoss: true },
  { name: "RELIANCE",  qty: 1, avg: 2193.70, price: 2112.40, net: "-3.71%", day: "+1.44%" },
  { name: "SBIN",      qty: 4, avg: 324.35, price: 430.20, net: "+32.63%", day: "-0.34%", isLoss: true },
  { name: "WIPRO",     qty: 4, avg: 489.30, price: 577.75, net: "+18.08%", day: "+0.32%" },
];

const demoPositions = [
  { product: "CNC", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, net: "+0.58%", day: "-1.24%", isLoss: true },
  { product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, net: "+10.04%", day: "-1.35%", isLoss: true },
];

const demoOrders = [
  { name: "INFY", qty: 2, price: 1520.00, mode: "BUY" },
  { name: "TCS", qty: 1, price: 3100.50, mode: "SELL" },
];

// In-memory store for demo orders (survives until server restart)
const memOrders = [...demoOrders];
const memHoldings = demoHoldings.map(h => ({...h}));

// Serialize/unserialize helpers for Passport (demo user has no real DB _id)
passport.serializeUser((user, done) => {
  done(null, user._id || user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (_err) {
    // If DB is down, return the demo user if that's who's logging in
    if (id === demoUser.id || id === demoUser._id) {
      return done(null, demoUser);
    }
    done(null, null);
  }
});

// app.get("/addHoldings", (req, res) => {
//   let tempHoldings=[
//     { name: "SAP", qty: 10, avg: 130, price: 136.0, net: "+4.6%", day: "+0.8%" },
//     { name: "BMW", qty: 5, avg: 85, price: 90.9, net: "+6.9%", day: "+0.5%" },
//     { name: "ALV", qty: 3, avg: 370, price: 383.7, net: "+3.7%", day: "+0.3%" },
//     { name: "BAYN", qty: 10, avg: 30, price: 28.6, net: "-4.7%", day: "+1.6%", isLoss: true },
//     { name: "IFX", qty: 8, avg: 35, price: 36.3, net: "+3.7%", day: "+0.3%" },
//       { name: "RWE", qty: 10, avg: 130, price: 136.0, net: "+4.6%", day: "+0.8%" },
//     { name: "VNA", qty: 5, avg: 85, price: 90.9, net: "+6.9%", day: "+0.5%" },
//     { name: "VOW3", qty: 3, avg: 370, price: 383.7, net: "+3.7%", day: "+0.3%" },
//     { name: "ZAL", qty: 10, avg: 30, price: 28.6, net: "-4.7%", day: "+1.6%", isLoss: true },
//     { name: "QIA", qty: 8, avg: 35, price: 36.3, net: "+3.7%", day: "+0.3%" },
//   ];
  
//   tempHoldings.forEach((item) =>{
//     let newHolding=new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day
//     });
//     newHolding.save();
//   });
//   res.send("Holdings added");
// });

// app.get("/addPosition", (req, res) => {
//   let tempPositions=[
//     { product: "CNC", name: "CBK", qty: 10, avg: 40, price: 36.7, net: "-8.3%", day: "-3.2%", isLoss: true },
//     { product: "CNC", name: "ZAL", qty: 5, avg: 26, price: 24.6, net: "-5.4%", day: "-2.4%", isLoss: true },
//     { product: "CNC", name: "RHM", qty: 2, avg: 470, price: 485.4, net: "+3.3%", day: "+1.5%" },
//   ];

//   tempPositions.forEach((item) =>{
//     let newPosition=new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss
//     });
//     newPosition.save();
//   });
//   res.send("Positions added");
// })
const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://steady-genie-711707.netlify.app',
  'https://zesty-liger-ed149b.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (e.g. mobile apps, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(bodyParser.json());

app.post('/ai/recommendations', async (req, res) => {
  try {
    const { holdings, watchlist } = req.body;
    const safeHoldings = holdings || [];
    const safeWatchlist = watchlist || [];
    const prompt = `Given these holdings: ${JSON.stringify(safeHoldings)}\n\nAnd this watchlist: ${JSON.stringify(safeWatchlist)}\n\nPlease produce a concise response with two labeled sections:
1) SUMMARY: one paragraph (2-3 sentences) stating the portfolio's key observation. Do not include legal advice or disclaimers.
2) RECOMMENDATIONS: up to 3 short, actionable recommendations (each 8-14 words), prioritizing interactions between holdings and watchlist (e.g., overlapping sectors, potential hedges, or buy/sell candidates).
Return plain text with the labels 'SUMMARY:' and 'RECOMMENDATIONS:' so the frontend can parse them programmatically.`;
    const apiKey = process.env.VITE_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No recommendation received.";
    res.json({ recommendations: text });
  } catch (error) {
     console.error('AI Recommendation Error:', error, error.stack);
    res.status(500).json({ message: 'AI recommendation error', error: error.message });
  }
});

// RAG-Enhanced AI Recommendations
app.post('/ai/rag-recommendations', async (req, res) => {
  try {
    const { holdings, watchlist, query } = req.body;
    const result = await getRAGEnhancedRecommendations(holdings, watchlist, query);
    res.json(result);
  } catch (error) {
    console.error('RAG AI Recommendation Error:', error);
    res.status(500).json({ message: 'RAG AI recommendation error', error: error.message });
  }
});

// Market Sentiment Analysis
app.post('/ai/market-sentiment', async (req, res) => {
  try {
    const { stocks } = req.body;
    const prompt = `Analyze current market sentiment for: ${stocks.join(', ')}
    
    Provide:
    OVERALL_SENTIMENT: [Bullish/Bearish/Neutral] (confidence %)
    KEY_DRIVERS: 3-4 main factors
    STOCK_SPECIFIC: Individual sentiment
    RECOMMENDATION: Market timing advice`;
    
    const apiKey = process.env.VITE_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No sentiment data available.";
    res.json({ sentiment: text });
  } catch (error) {
    console.error('Market Sentiment Error:', error);
    res.status(500).json({ message: 'Market sentiment error', error: error.message });
  }
});

// Smart Trade Analysis
app.post('/ai/trade-analysis', async (req, res) => {
  try {
    const { stock, tradeType, userPortfolio } = req.body;
    const prompt = `Analyze ${stock} for ${tradeType} decision.
    
    User Portfolio: ${JSON.stringify(userPortfolio)}
    
    Provide:
    TRADE_SIGNAL: [Strong Buy/Buy/Hold/Sell/Strong Sell] (confidence 1-10)
    ENTRY_STRATEGY: Optimal entry timing
    RISK_ANALYSIS: Key risks
    POSITION_SIZING: Recommended % of portfolio
    STOP_LOSS: Suggested levels
    PROFIT_TARGETS: Target prices
    MARKET_CONTEXT: Current market impact
    PORTFOLIO_IMPACT: Effect on overall portfolio`;
    
    const apiKey = process.env.VITE_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Analysis not available.";
    res.json({ analysis: text });
  } catch (error) {
    console.error('Trade Analysis Error:', error);
    res.status(500).json({ message: 'Trade analysis error', error: error.message });
  }
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return done(null, false, { message: 'Invalid password' });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// ── Demo Login ── skips MongoDB entirely, always works
app.post('/demo-login', (req, res) => {
  req.login(demoUser, (err) => {
    if (err) return res.status(500).json({ message: 'Demo login failed' });
    return res.json({
      message: 'Demo login successful',
      user: { id: demoUser._id, email: demoUser.email, name: demoUser.name }
    });
  });
});

app.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new UserModel({ email, password, name });
    await user.save();
    
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Login failed' });
      }
      res.json({ message: 'Signup successful', user: { id: user._id, email: user.email, name: user.name } });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful', user: { id: req.user._id, email: req.user.email, name: req.user.name } });
});

app.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.json({ message: 'Logout successful' });
  });
});

app.get('/allHoldings', async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (_err) {
    // MongoDB down → return demo data
    console.log('DB unavailable, returning demo holdings');
    res.json(demoHoldings);
  }
});

app.get('/allOrders', async (req, res) => {
  try {
    let allOrders = await OrdersModel.find({});
    res.json(allOrders);
  } catch (_err) {
    console.log('DB unavailable, returning in-memory orders');
    res.json(memOrders);
  }
});

app.get('/allPositions', async (req, res) => {
  try {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (_err) {
    console.log('DB unavailable, returning demo positions');
    res.json(demoPositions);
  }
});

app.post('/newOrder', async (req, res) => {
  const { name, qty, price, mode } = req.body;

  try {
    // Try saving to MongoDB
    let newOrder = new OrdersModel({ name, qty, price, mode });
    await newOrder.save();

    // Sell logic: update holdings
    if (mode === "SELL") {
      let holding = await HoldingsModel.findOne({ name });
      if (holding) {
        holding.qty -= qty;
        if (holding.qty <= 0) {
          await HoldingsModel.deleteOne({ name });
        } else {
          await holding.save();
        }
      }
    }
  } catch (_err) {
    // MongoDB down → use in-memory store
    console.log('DB unavailable, using in-memory order store');
    memOrders.push({ name, qty: Number(qty), price: Number(price), mode });
    if (mode === "SELL") {
      const idx = memHoldings.findIndex(h => h.name === name);
      if (idx >= 0) {
        memHoldings[idx].qty -= Number(qty);
        if (memHoldings[idx].qty <= 0) memHoldings.splice(idx, 1);
      }
    }
  }

  res.json({ message: "Order placed successfully" });
});
mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
