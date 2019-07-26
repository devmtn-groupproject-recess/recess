import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
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
    <div className='message-box'>
      {props.users ?
      
      <Redirect to='/home' />

      :
      
      <div>
        <h1>Welcome Back! Please Log in!</h1>
        <input 
          placeholder='Username'
          type='text'
          name='username'
          onChange={(event) => handleChange(event)}
        />  
        <input 
          placeholder='Password'
          type='text'
          name='password'
          onChange={(event) => handleChange(event)}
        />  
        <button 
         onClick={ () => loginUser()}>Login</button>
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