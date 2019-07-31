import React, {useState, useEffect} from 'react'
import './EditProfile.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {checkUser, getUser, editUser} from '../../Redux/reducers/users'
import AmazonS3 from '../S3Bucket/S3Bucket'



function EditProfile(props) {

  let [editedInfo, setEditedInfo] = useState({
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
          user_first_name: props.selected.user_first_name,
          user_last_name: props.selected.user_last_name,
            user_address: props.selected.user_address,
            user_city: props.selected.user_city,
            user_state: props.selected.user_state,
            user_zip: props.selected.user_zip,
            user_phone: props.selected.user_phone,
            user_img: props.selected.user_img,
        })
    }
    console.log(editedInfo)
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
    props.history.push(`/profile/${props.match.params.user_id}`)
  }
  
  let setUserPic = (url) => {
    setEditedInfo({
      ...editedInfo,
      user_img: url
    })
    console.log(editedInfo)
  }
  
  return (
    <div className="gradient">
      {props.users ?
      
      
      
      <div className="editForm">
        {editedInfo.user_img ?
        
        <img src={editedInfo.user_img} />
        
        :

        <img src='https://www.biiainsurance.com/wp-content/uploads/2015/05/no-image.jpg' />

        }
        <AmazonS3 setUserPic={setUserPic} />
        <input className="input"
          placeholder='First Name'
          value={editedInfo.user_first_name}
          type='text'
          name='user_first_name'
          onChange={(event) => handleChange(event)}
        />
        <br/> 
        <input className="input"
          placeholder='Last Name'
          value={editedInfo.user_last_name}
          type='text'
          name='user_last_name'
          onChange={(event) => handleChange(event)}
          /> 
        <br/>  
        <input className="input"
          value={editedInfo.user_address}
          placeholder='Address'
          type='text'
          name='user_address'
          onChange={(event) => handleChange(event)}
          />
        <br/>   
        <input className="input"
          value={editedInfo.user_city}
          placeholder='City'
          type='text'
          name='user_city'
          onChange={(event) => handleChange(event)}
          /> 
        <br/>  
        <input className="input"
          value={editedInfo.user_state}
          placeholder='State'
          type='text'
          name='user_state'
          onChange={(event) => handleChange(event)}
          /> 
        <br/>  
        <input className="input"
          value={editedInfo.user_zip}
          placeholder='Zip Code'
          type='number'
          name='user_zip'
          onChange={(event) => handleChange(event)}
        />
        <br/>   
        <input className="input"
          value={editedInfo.user_phone}
          placeholder='Phone Number'
          type='text'
          name='user_phone'
          onChange={(event) => handleChange(event)}
          /> 
        <br/> 
        <button className="btn"
         onClick={ () => handleChanges()}>Save</button>
      </div>

      :
      
        <Redirect to='/' />
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