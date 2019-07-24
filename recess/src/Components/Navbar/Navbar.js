import React, { useState } from 'react'
import { Link, withRouter } from "react-router-dom";
import './Navbar.css'

function Navbar() {
    return(
      <div>
          <nav className="navbar">
              <div>
              <label for="toggle" class="label">&#9776;</label>
                <input type="checkbox" id="toggle"/>
                <div class="menu">
                  <Link to="/" className="words">Home</Link>
                  <Link to="/event" className="words">Events</Link>
                  <Link to="/profile" className="words">Profile</Link>
                  <Link to="/login" className="words">Login</Link>
                  </div>
              </div>
          </nav>
      </div>  
    )
  }

  //Unsure where to put the link to the other profile at so we can discuss that and add that to the router.

  export default Navbar;