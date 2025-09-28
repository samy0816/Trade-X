
import React from 'react'
import {Link} from 'react-router-dom';

function Navbar() {
    return (
<div>
    <nav class="navbar navbar-expand-lg border-bottom" style={{backgroundColor:"white"}}>
  <div class="container p-2">
    <Link class="navbar-brand" to="/">
        <img src="media/images/logo.png" style={{ width: "25%" }} alt="Logo" />
    </Link  >
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/Signup">Signup</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/About">About</Link>
        </li>
           <li class="nav-item">
          <Link class="nav-link" to="/Productpage">Product</Link>
        </li>

   <li class="nav-item">
          <Link class="nav-link" to="/Pricingpage">Pricing</Link>
        </li>

   <li class="nav-item">
          <Link class="nav-link" to="/Supportpage">Support</Link>
        </li>

        <li class="nav-item">
          <Link class="nav-link" to="#"><i class="fa-solid fa-bars"></i></Link>
        </li>


      </ul>
    </div>
  </div>
</nav>
    </div>
    );
}

export default Navbar;