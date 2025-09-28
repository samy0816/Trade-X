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
app.use(cors());

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

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
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
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get('/allOrders', async (req, res) => {
  let allOrders = await OrdersModel.find({});
  res.json(allOrders);
});
app.get('/allPositions', async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.post('/newOrder', async (req, res) => {
  const { name, qty, price, mode } = req.body;

  // Save the order
  let newOrder = new OrdersModel({
    name,
    qty,
    price,
    mode
  });
  await newOrder.save();

  // Sell logic: update holdings/positions if mode is SELL
  if (mode === "SELL") {
    // Example: Decrease qty in HoldingsModel
    let holding = await HoldingsModel.findOne({ name });
    if (holding) {
      holding.qty -= qty;
      if (holding.qty <= 0) {
        await HoldingsModel.deleteOne({ name });
      } else {
        await holding.save();
      }
    }
    // You can add similar logic for PositionsModel if needed
  }

  res.send("New order added");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  mongoose.connect(uri)
    console.log("MongoDB connected");

});
