# Trade-X 🚀

> **A Next-Generation AI-Powered Trading Platform**

An advanced full-stack trading platform inspired by modern fintech applications, featuring cutting-edge **RAG (Retrieval-Augmented Generation)** AI technology for intelligent portfolio management and trading insights.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-View_App-blue?style=for-the-badge)](https://steady-genie-711707.netlify.app/)
[![Dashboard](https://img.shields.io/badge/📊_Dashboard-Trading_App-green?style=for-the-badge)](https://zesty-liger-ed149b.netlify.app/)
[![API](https://img.shields.io/badge/🔌_API-Backend-orange?style=for-the-badge)](https://trade-x-iaaz.onrender.com/)

---

## 🎯 **Key Features**

### 🤖 **Advanced AI Capabilities**
- **RAG AI Analyzer**: Knowledge-enhanced portfolio analysis with structured recommendations
- **Market Sentiment Analysis**: Real-time sentiment tracking with confidence scoring
- **Smart Trade Advisor**: Individual stock analysis with buy/sell recommendations
- **Intelligent Fallback System**: Ensures AI features work even during API limits

### 💼 **Core Trading Features**
- **Complete Order Management**: Buy/Sell with real-time order tracking
- **Portfolio Analytics**: Holdings, positions, P&L tracking
- **Interactive Watchlist**: Monitor and analyze multiple stocks
- **Funds Management**: Account balance and transaction history

### 🎨 **Modern UI/UX**
- **Glassmorphism Design**: Beautiful translucent interface elements
- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Real-time Updates**: Live data synchronization
- **Professional Trading Interface**: Inspired by industry-leading platforms

---

## 🏗️ **Architecture**

```
📁 Trade-X/
├── 🌐 frontend/          # Landing page & authentication
├── 📊 dashboard/         # Main trading interface
├── ⚙️  backend/          # API server & AI services
└── 📚 docs/             # Documentation & guides
```

### 🔧 **Technology Stack**

| **Category** | **Technologies** |
|--------------|------------------|
| **Frontend** | React 18, Material-UI, Chart.js, Axios |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **AI/ML** | Google Gemini API, RAG Architecture, Natural Language Processing |
| **Deployment** | Netlify (Frontend), Render (Backend) |
| **Authentication** | Passport.js, Sessions, Secure Cookies |
| **Styling** | Modern CSS, Glassmorphism, Responsive Design |

---

## 🚀 **Live Demo**

| **Component** | **URL** | **Description** |
|---------------|---------|-----------------|
| **🏠 Landing Page** | [steady-genie-711707.netlify.app](https://steady-genie-711707.netlify.app/) | Marketing site, signup, login |
| **📊 Dashboard** | [zesty-liger-ed149b.netlify.app](https://zesty-liger-ed149b.netlify.app/) | Full trading interface |
| **🔌 API** | [trade-x-iaaz.onrender.com](https://trade-x-iaaz.onrender.com/) | Backend services |

---

## 🤖 **AI Features Deep Dive**

### **1. RAG AI Analyzer** 
```javascript
// Advanced portfolio analysis with knowledge enhancement
- Sector diversification analysis
- Risk assessment with specific recommendations  
- Strategic portfolio rebalancing suggestions
- Market context integration
```

### **2. Market Sentiment Analyzer**
```javascript
// Real-time market mood analysis
- Bullish/Bearish sentiment detection
- Confidence scoring (1-100%)
- Key market drivers identification
- Stock-specific sentiment analysis
```

### **3. Smart Trade Advisor**
```javascript
// Individual stock analysis and recommendations
- Entry/exit point suggestions
- Position sizing recommendations
- Risk analysis and stop-loss levels
- Technical and fundamental insights
```

---

## 🛠️ **Local Development**

### **Prerequisites**
- Node.js 16+ and npm
- MongoDB (local or cloud)
- Google Gemini API key

### **Quick Start**

1. **Clone Repository**
```bash
git clone https://github.com/samy0816/Trade-X.git
cd Trade-X
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file with:
# MONGO_URL=your_mongodb_connection_string
# VITE_GEMINI_API_KEY=your_gemini_api_key

npm start
# Server runs on http://localhost:3002
```

3. **Dashboard Setup**
```bash
cd ../dashboard
npm install
npm start
# App runs on http://localhost:3000
```

4. **Frontend Setup**
```bash
cd ../frontend
npm install
npm start
# Landing page runs on http://localhost:3001
```

---

## 📊 **API Endpoints**

### **Core Trading**
- `GET /allHoldings` - Fetch user holdings
- `GET /allOrders` - Fetch order history
- `GET /allPositions` - Fetch current positions
- `POST /newOrder` - Place buy/sell orders

### **AI Services**
- `POST /ai/rag-recommendations` - RAG-enhanced portfolio analysis
- `POST /ai/market-sentiment` - Market sentiment analysis
- `POST /ai/trade-analysis` - Individual stock analysis

### **Authentication**
- `POST /signup` - User registration
- `POST /login` - User login
- `POST /logout` - Session termination

---

## 🎨 **UI Components**

### **Advanced AI Components**
- `RAGAIAnalyzer.js` - Knowledge-enhanced portfolio analysis
- `MarketSentimentAnalyzer.js` - Real-time sentiment tracking
- `SmartTradeAdvisor.js` - Individual stock recommendations

### **Core Trading Components**
- `Holdings.js` - Portfolio overview and management
- `Orders.js` - Order history with color-coded status
- `WatchList.js` - Stock monitoring and quick actions
- `BuyActionWindow.js` / `SellActionWindow.js` - Order placement

---

## 🔒 **Security Features**

- **Secure Authentication**: Passport.js with session management
- **Data Validation**: Input sanitization and validation
- **API Rate Limiting**: Prevents abuse and ensures stability
- **Environment Variables**: Secure configuration management
- **Error Handling**: Graceful failure management

---

## 🌟 **Project Highlights**

### **Innovation**
- First trading platform to implement RAG AI for portfolio analysis
- Intelligent fallback systems for uninterrupted service
- Real-time market sentiment integration

### **Technical Excellence**
- Clean, modular architecture
- Comprehensive error handling
- Production-ready deployment
- Mobile-responsive design

### **User Experience**
- Intuitive interface design
- Real-time data updates
- Professional trading tools
- Seamless navigation

---

## 📈 **Performance**

- **Frontend**: Optimized React components with lazy loading
- **Backend**: Efficient database queries and caching
- **AI**: Smart rate limiting and fallback systems
- **Mobile**: Responsive design with touch optimization

---

## 🤝 **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ **Disclaimer**

This project is for **educational and demonstration purposes only**. It is not affiliated with, endorsed by, or connected to Zerodha or any other trading platform. This is not financial advice, and users should consult with financial professionals before making investment decisions.

---

## 👨‍💻 **Author**

**Samarth Joshi**
- GitHub: [@samy0816](https://github.com/samy0816)
- LinkedIn: [Connect with me](https://linkedin.com/in/samarth-joshi)

---

## 🙏 **Acknowledgments**

- **Google Gemini API** for advanced AI capabilities
- **Zerodha** for design inspiration
- **Open Source Community** for amazing libraries and tools

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/samy0816/Trade-X?style=social)](https://github.com/samy0816/Trade-X/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/samy0816/Trade-X?style=social)](https://github.com/samy0816/Trade-X/network)

**Built with ❤️ by Samarth Joshi**

</div>