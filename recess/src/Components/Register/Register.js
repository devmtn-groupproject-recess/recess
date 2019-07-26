import React, {useState, useEffect} from 'react'
import './Register.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {checkUser, register} from '../../Redux/reducers/users'



function Register(props) {

  let [registerInfo, setRegisterInfo] = useState({
    username: '',
    password: '',
    user_first_name: '',
    user_last_name: '',
    user_address: '',
    user_city: '',
    user_state: '',
    user_zip: null,
    user_phone: '',
    user_img: ''
  })

  useEffect(  () => {
    props.checkUser()
  }, []) 

  let handleChange = (event) => {
    const {name, value} = event.target
    setRegisterInfo({
      ...registerInfo,
      [name]: value 
    })
  }

  let handleRegister = async() => {
    console.log("New Props: ", props)
    for( let key in registerInfo){
      let input = registerInfo[key]
        if (!input){
            return alert('All fields must be filled in')
        }
    }
    await props.register(registerInfo)
    setRegisterInfo({
      username: '',
      password: '',
      user_first_name: '',
      user_last_name: '',
      user_address: '',
      user_city: '',
      user_state: '',
      user_zip: null,
      user_phone: '',
      user_img: ''
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
          placeholder='First Name'
          type='text'
          name='user_first_name'
          onChange={(event) => handleChange(event)}
        />  
        <input 
          placeholder='Last Name'
          type='text'
          name='user_last_name'
          onChange={(event) => handleChange(event)}
        />  
        <input 
          placeholder='Address'
          type='text'
          name='user_address'
          onChange={(event) => handleChange(event)}
        />  
        <input 
          placeholder='City'
          type='text'
          name='user_city'
          onChange={(event) => handleChange(event)}
        />  
        <input 
          placeholder='State'
          type='text'
          name='user_state'
          onChange={(event) => handleChange(event)}
        />  
        <input 
          placeholder='Zip Code'
          type='number'
          name='user_zip'
          onChange={(event) => handleChange(event)}
        />  
        <input 
          placeholder='Phone Number'
          type='text'
          name='user_phone'
          onChange={(event) => handleChange(event)}
        />  
        <input 
          placeholder='Image Url'
          type='text'
          name='user_img'
          onChange={(event) => handleChange(event)}
        />  
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
         onClick={ () => handleRegister()}>Create</button>
      </div>
      }
    </div>

  )
  
}

let mapDispatchToProps = {
  register,
  checkUser
}

let mapStateToProps = state => {
  return{
    users: state.users.data
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);