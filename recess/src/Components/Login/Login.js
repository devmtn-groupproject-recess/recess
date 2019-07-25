import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import './Login.css'

import {login} from '../../Redux/reducers/users'



function Login() {

  let [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  })
  let [password, setPassword] = useState('')



  return (
    <div className='message-box'>
        {/* <h1>Welcome Back! Please Log in!</h1>
        <div>
          <input 
            placeholder='Username'
            type='text'
            name='Username'
            onChange={(event) => handleChange(event)}
          />  
          <input 
            placeholder='Password'
            type='text'
            name='Password'
            onChange={(event) => handleChange(event)}
          />  
          <button 
           onClick={ () => login(username, password)}>Login</button>
        </div> */}
      </div>

  )
  
}

let mapDispatchToProps = {

}

export default connect(null, mapDispatchToProps)(Login);