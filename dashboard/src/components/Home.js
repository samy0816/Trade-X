import React from "react";
import axios from "axios";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const handleLogout = async () => {
    try {
  await axios.post('https://trade-x-iaaz.onrender.com/logout');
  // Redirect to frontend live URL
  window.location.href = 'https://steady-genie-711707.netlify.app/';
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, redirect to frontend
  window.location.href = 'https://steady-genie-711707.netlify.app/';
    }
  };

  return (
    <>
      <TopBar />
      <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
        <button 
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      <Dashboard />
    </>
  );
};

export default Home;