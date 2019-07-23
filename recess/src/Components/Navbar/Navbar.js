import React, { useState } from 'react'
import { Link, withRouter } from "react-router-dom";
import './Navbar.css'

function Navbar() {
    return(
      <div>
          <nav>
              <div>
                  <Link to="/">Home</Link>
                  <Link to="/login">Login</Link>
                  <Link to="/event">Events</Link>
                  <Link to="/profile">Profile</Link>
              </div>
          </nav>
      </div>  
    )
  }

  //Unsure where to put the link to the other profile at so we can discuss that and add that to the router.

  export default Navbar;