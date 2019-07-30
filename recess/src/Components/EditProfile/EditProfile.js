import React, {useState, useEffect} from 'react'
import './EditProfile.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {checkUser, getUser, editUser} from '../../Redux/reducers/users'
import AmazonS3 from '../S3Bucket/S3Bucket'



function EditProfile(props) {

  let [editedInfo, setEditedInfo] = useState({
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
    
    if(props.selected === null) {
        props.checkUser()
        props.getUser(props.match.params.user_id)
    }
    if(props.selected !== null){
        setEditedInfo({
            username: props.selected.username
        })
    }
  }, [props.selected]) 

  let handleChange = (event) => {
    const {name, value} = event.target
    setEditedInfo({
      ...editedInfo,
      [name]: value 
    })
  }

  let handleChanges = async() => {
    console.log("New Props: ", props)
    for( let key in editedInfo){
      let input = editedInfo[key]
        if (!input){
            return alert('All fields must be filled in')
        }
    }
    await props.editUser(editedInfo)
    setEditedInfo({
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
    setEditedInfo({
      ...editedInfo,
      user_img: url
    })
    console.log(editedInfo.user_img)
  }
  
  return (
    <div>
      {props.users ?
      
    //   <Redirect to='/home' />
    <div>ladeda</div>

      :
      
      <div className='registerBox'>
        <h1 className="header">Welcome! Please Create An Account!</h1>
        {editedInfo.user_img ?
        
        <img src={editedInfo.user_img} />

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
        <br/> 
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
        <br/>   
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
        <br/>  
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
        <br/> 
        <button className="btn"
         onClick={ () => handleChanges()}>Save</button>
      </div>
      }
    </div>

  )
  
}

let mapDispatchToProps = {
  getUser,
  checkUser,
  editUser
}

let mapStateToProps = state => {
    console.log(state)
  return{
    users: state.users.data,
    selected: state.users.selected
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);