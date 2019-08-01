import React, {useState, useEffect} from 'react'
import './Register.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {checkUser, register} from '../../Redux/reducers/users'
import AmazonS3 from '../S3Bucket/S3Bucket'



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
  
  let setUserPic = (url) => {
    setRegisterInfo({
      ...registerInfo,
      user_img: url
    })
    console.log(registerInfo.user_img)
  }
  
  return (
    <div className="bg">
      {props.users ?
      
      <Redirect to='/home' />

      :
      
      <div className='registerBox'>
        <h1 className="header">Welcome! Please Create An Account!</h1>
        <div className="letteringText" onClick={() => props.history.push('/')}>Already Have An Account? Log In Here.</div>
        {registerInfo.user_img ?
        
        <img src={registerInfo.user_img} />

        :

        <img src='https://www.biiainsurance.com/wp-content/uploads/2015/05/no-image.jpg' />

        }
        <AmazonS3 setUserPic={setUserPic} />
        <input className="input"
          placeholder='First Name'
          type='text'
          name='user_first_name'
          onChange={(event) => handleChange(event)}
        />
        
        <input className="input"
          placeholder='Last Name'
          type='text'
          name='user_last_name'
          onChange={(event) => handleChange(event)}
        /> 
        <br/>  
        <input className="input"
          placeholder='Address'
          type='text'
          name='user_address'
          onChange={(event) => handleChange(event)}
        />
          
        <input className="input"
          placeholder='City'
          type='text'
          name='user_city'
          onChange={(event) => handleChange(event)}
        /> 
        <br/>  
        <input className="input"
          placeholder='State'
          type='text'
          name='user_state'
          onChange={(event) => handleChange(event)}
        /> 
        
        <input className="input"
          placeholder='Zip Code'
          type='number'
          name='user_zip'
          onChange={(event) => handleChange(event)}
        />
        <br/>   
        <input className="input"
          placeholder='Phone Number'
          type='text'
          name='user_phone'
          onChange={(event) => handleChange(event)}
        />  
        
        <input className="input"
          placeholder='Username'
          type='text'
          name='username'
          onChange={(event) => handleChange(event)}
        /> 
        <br/>  
        <input className="input"
          placeholder='Password'
          type='text'
          name='password'
          onChange={(event) => handleChange(event)}
        />  
        <br/> 
        <button className="btn"
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

