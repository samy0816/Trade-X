# 🚀 Deployment Guide

## Current Deployment Status

### Live URLs
- **Frontend/Landing**: https://steady-genie-711707.netlify.app/
- **Dashboard**: https://zesty-liger-ed149b.netlify.app/
- **Backend API**: https://trade-x-iaaz.onrender.com/

## Frontend Deployment (Netlify)

### Landing Page
```bash
cd frontend
npm run build
# Deploy dist/ folder to Netlify
```

### Dashboard
```bash
cd dashboard
npm run build
# Deploy build/ folder to Netlify
```

### Environment Variables (Netlify)
```
# No environment variables needed for frontend
# API URLs are automatically detected based on hostname
```

## Backend Deployment (Render)

### Prerequisites
- MongoDB Atlas account
- Google Gemini API key

### Environment Variables (Render)
```bash
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/tradex
VITE_GEMINI_API_KEY=your_gemini_api_key_here
PORT=3002
```

### Deployment Steps
1. Connect GitHub repository to Render
2. Select backend folder as root directory
3. Set build command: `npm install`
4. Set start command: `node index.js`
5. Add environment variables
6. Deploy

## Local Development URLs

When running locally, the system automatically detects localhost:

```javascript
// Automatic URL detection
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3002'      // Local development
  : 'https://trade-x-iaaz.onrender.com';  // Production
```

### Local Setup
```bash
# Backend (Terminal 1)
cd backend
npm start
# Runs on http://localhost:3002

# Dashboard (Terminal 2)  
cd dashboard
npm start
# Runs on http://localhost:3000

# Frontend (Terminal 3)
cd frontend
npm start
# Runs on http://localhost:3001
```

## Database Setup (MongoDB Atlas)

1. Create MongoDB Atlas account
2. Create cluster and database named "tradex"
3. Add collections: holdings, orders, positions, users
4. Get connection string
5. Add to environment variables

## API Configuration

The app uses dynamic API configuration:
- **Development**: All API calls go to `localhost:3002`
- **Production**: All API calls go to `trade-x-iaaz.onrender.com`

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS is configured for your frontend domains
2. **API Rate Limits**: The app has built-in fallback systems for AI features
3. **Environment Variables**: Double-check all required env vars are set

### Health Checks
- Backend: `GET /` - Should return server status
- Database: Check MongoDB Atlas dashboard
- AI Features: Test with sample portfolio data

---

*Last updated: October 2025*