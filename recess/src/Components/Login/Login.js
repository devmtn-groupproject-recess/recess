import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import './Login.css'

import {login} from '../../Redux/reducers/users'



function Login(props) {

  let [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  })

  let handleChange = (event) => {
    const {name, value} = event.target
    setLoginInfo({
      [name]: value 
    })
  }

  let loginUser = async () => {
    console.log('hit')
    // login(loginInfo)
    // setLoginInfo({
    //   username:'',
    //   password: ''
    // })
    let {username, password} = loginInfo
    console.log(username, password)
    if(username === '' || password === '') {
      return alert('Must enter a username and password')
    }
    await props.login(loginInfo)
    setLoginInfo({
      username: '',
      password: ''
    })
    props.history.push('/user/admin/api/cars')
  }


  return (
    <div className='message-box'>
        <h1>Welcome Back! Please Log in!</h1>
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
           onClick={ () => loginUser()}>Login</button>
        </div>
      </div>

  )
  
}

let mapDispatchToProps = {
  login
}

export default connect(null, mapDispatchToProps)(Login);