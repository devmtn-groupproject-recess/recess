import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { Link } from "react-router-dom";
import './Login.css'

import {login, checkUser} from '../../Redux/reducers/users'

function Login(props) {

  let [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  })

  useEffect(  () => {
    props.checkUser()

  }, []) 

  let handleChange = (event) => {
    const {name, value} = event.target
    setLoginInfo({
      ...loginInfo,
      [name]: value 
    })
    
  }

  let loginUser = async () => {
    const {username, password} = loginInfo
    if(username === '' || password === '') {
      return alert('Must enter a username and password')
    }
    await props.login(loginInfo)
    setLoginInfo({
      username: '',
      password: ''
    })
    props.history.push('/home')
  }
  
  
  
  return (
    <div className='bg'>
      {props.users ?
      
      <Redirect to='/home' />

      :
      
      <div className="loginBox">
        <h1><i>Welcome! Please Log in!</i></h1>
        <input className="username"
          placeholder='Username'
          type='text'
          name='username'
          onChange={(event) => handleChange(event)}
        />  
        <input className="password"
          placeholder='Password'
          type='password'
          name='password'
          onChange={(event) => handleChange(event)}
          /> 
          <br/> 
        <button className="btn"
         onClick={ () => loginUser()}>Login</button>
        
         <h5 className="regText">Need an account? <Link to="/register" className="register" >Register Here.</Link></h5>
      </div>
      }
    </div>

  )
  
}

let mapDispatchToProps = {
  login,
  checkUser
}

let mapStateToProps = state => {
  return{
    users: state.users.data
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

