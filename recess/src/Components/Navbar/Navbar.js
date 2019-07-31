import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './Navbar.css'
import {logout, checkUser} from '../../Redux/reducers/users'
import {connect} from 'react-redux'

function Navbar(props) {

  useEffect( () => {
    props.checkUser()
    console.log('Hit Navbar')
  }, [])

  let handleLogout = () => {
    console.log("hit")
    props.logout()
  }

  console.log(props.user)

    return(
      <div className="navbar">
        <i className="logo">RECESS</i>
        {props.user && props.user.data && 
        <div>
            <nav >
                <div>
                  <label for="toggle" class="label">&#9776;</label>
                  <input type="checkbox" id="toggle"/>
                  <div class="menu">
                    <Link to="/home" className="words">Home</Link>
                    <Link to="/events" className="words">Events</Link>
                    <Link to={`/profile/${props.user.data.user_id}`} className="words">Profile</Link>
                    <p className="words" onClick={handleLogout}>Logout</p>
                  </div>
                </div>
            </nav>
            
            <br/>
            <br/>
            <br/>
          </div>
        }
      </div>  
    )
  }

  //Unsure where to put the link to the other profile at so we can discuss that and add that to the router.
  let mapDispatchToProps = {
    logout,
    checkUser
  }

  let mapStateToProps = state => {
    console.log(state)
    return {
      user: state.users.data
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Navbar);