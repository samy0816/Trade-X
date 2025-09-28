import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Homepage from './landing_page/home/Homepage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignupPage from './landing_page/signup/SignupPage';
import About from './landing_page/about/Aboutpage';
import ProductPage from './landing_page/product/Productpage';
import PricingPage from './landing_page/pricing/Pricingpage';
import SupportPage from  './landing_page/support/Supportpage';
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/Notfound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
       <Navbar />
       <Routes>
         <Route path="/" element={<Homepage />} />
              <Route path="/Signup" element={<SignupPage />} />
                   <Route path="/About" element={<About />} />
                        <Route path="/Productpage" element={<ProductPage />} />
                             <Route path="/Pricingpage" element={<PricingPage/>} />
                                  <Route path="/Supportpage" element={<SupportPage/>} />
                                  <Route path="*" element={<NotFound />} />
       </Routes>
       <Footer />
     </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

