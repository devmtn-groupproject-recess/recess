import React, { useState } from 'react'
import { Link } from "react-router-dom";
import './Navbar.css'
import {logout} from '../../Redux/reducers/users'
import {connect} from 'react-redux'

function Navbar(props) {

  let handleLogout = () => {
    console.log("hit")
    props.logout()
  }
    return(
      <div>
          <nav className="navbar">
              <div>
                <i className="logo">RECESS</i>
                <label for="toggle" class="label">&#9776;</label>
                <input type="checkbox" id="toggle"/>
                <div class="menu">
                  <Link to="/home" className="words">Home</Link>
                  <Link to="/event" className="words">Events</Link>
                  <Link to="/profile" className="words">Profile</Link>
                  <p className="words" onClick={handleLogout}>Logout</p>
                </div>
              </div>
          </nav>
          <br/>
          <br/>
          <br/>
      </div>  
    )
  }

  //Unsure where to put the link to the other profile at so we can discuss that and add that to the router.
  let mapDispatchToProps = {
    logout
  }
  export default connect(null, mapDispatchToProps)(Navbar);