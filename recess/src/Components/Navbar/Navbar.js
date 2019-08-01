import React, { useState, useEffect } from 'react'
import { Link, withRouter } from "react-router-dom";
import './Navbar.css'
import {logout, checkUser} from '../../Redux/reducers/users'
import {connect} from 'react-redux'

function Navbar(props) {

  useEffect( () => {
    props.checkUser()
  }, [])

  let handleLogout = () => {
    props.logout()
  }


    return(
      <div className="navbar">
        <i className="logo">RECESS</i>
        {props.user && props.user.data && 
        
            <nav className='someName' >
                  <label for="toggle" class="label">&#9776;</label>
                  <input type="checkbox" id="toggle"/>
                
                  <div class="menu">
                    <p onClick={ () => props.history.push("/home")} className="words">My Games</p>
                    <p onClick={ () => props.history.push("/events")} className="words">All Games</p>
                    <p onClick={ () => props.history.push(`/profile/${props.user.data.user_id}`)} className="words">Profile</p>
                    <p className="words" onClick={handleLogout}>Logout</p>
                  </div>
                
            </nav>
            
            
         
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
    return {
      user: state.users.data
    }
  }
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));