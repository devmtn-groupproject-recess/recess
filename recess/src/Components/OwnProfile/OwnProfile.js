import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import './OwnProfile.css'
import {getUser, checkUser} from '../../Redux/reducers/users'

function OwnProfile(props) {
  useEffect(() => {
    props.checkUser()
    props.getUser(props.match.params.user_id)
  }, [])
  console.log(props.user)
    return (
      
      <div>
      { props.user ? 
        <div className='background'>
          <div className="playerCard">
            <img className="profilePic" src={props.user.data.user_img}/>
            <h2>{props.user.data.username}</h2>
            <h3>{`${props.user.data.user_city}, ${props.user.data.user_state}`}</h3>
            <h3>Sports</h3>
          </div>
        </div>
        : 
        <div>YOHO</div>
      }
      </div>
    )
  }

  let mapStateToProps = state => {
    console.log(state)
    return {
      user: state.users.data,
      selected: state.users.selected

    }
  }

  export default connect(mapStateToProps, {getUser, checkUser})(OwnProfile);