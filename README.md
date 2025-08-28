Trade-X (Zerodha Clone) 🚀

A fullstack clone of the Zerodha trading platform, built as a learning project.  
**Note:** This is a demo/clone project and not affiliated with Zerodha or TradeX.

Live Demo

- **Landing Page / Signup:** [steady-genie-711707.netlify.app](https://steady-genie-711707.netlify.app/)
- **Dashboard:** [zesty-liger-ed149b.netlify.app](https://zesty-liger-ed149b.netlify.app/)
- **Backend API:** [trade-x-iaaz.onrender.com](https://trade-x-iaaz.onrender.com/)

---

Features

- User authentication (signup/login)
- Dashboard with holdings, positions, orders, and funds
- AI-powered trading recommendations (Gemini API)
- Buy/Sell actions with simulated order flow
- Watchlist management
- Responsive, modern UI inspired by Zerodha
- Logout and session management

---

Tech Stack

- **Frontend:** React, Axios, CSS, Netlify (deployment)
- **Dashboard:** React, Axios, Netlify (deployment)
- **Backend:** Node.js, Express, MongoDB, Gemini API, Render (deployment)
- **AI:** Google Gemini API for recommendations

---

## Folder Structure
/frontend # Landing page, signup, and marketing site /dashboard # Main trading dashboard (holdings, orders, AI, etc.) /backend # Express API, MongoDB models, AI integration


---

## Local Development

1. Clone the repository

```bash
git clone https://github.com/samy0816/Trade-X.git
cd Trade-X
```
2. Backend Setup

cd backend
npm install
# Create a .env file with your MongoDB URI and Gemini API key
npm start

3. Frontend Setup
cd ../frontend
npm install
npm start

4. Dashboard Setup

cd ../dashboard
npm install
npm start


 Deployment
Frontend & Dashboard: Deployed on Netlify
Backend: Deployed on Render

Usage
Sign up or log in from the landing page.
After authentication, you’ll be redirected to the dashboard.
Explore holdings, positions, orders, and get AI recommendations.
Use the logout button to return to the landing page.

Disclaimer
This project is for educational purposes only.
It is not affiliated with, endorsed by, or connected to Zerodha or TradeX in any way.

License
MIT

Author
Samarth Joshi
