import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import './OtherProfile.css'
import {getUser, checkUser} from '../../Redux/reducers/users'

function OwnProfile(props) {
  useEffect(() => {
    props.checkUser()
    props.getUser(props.match.params.user_id)
    console.log(props.match.params.user_id)
  }, [])
  console.log(999999999999999999999, props)
    return (
      
      <div>
      { props.user ? 
        <div className='background'>
          <div className="playerCard">
            <img className="profilePic" src={props.selected.user_img}/>
            <h1>{`${props.selected.user_first_name} ${props.selected.user_last_name}`}</h1>
            <h2>{props.selected.username}</h2>
            <h3>{`${props.selected.user_city}, ${props.selected.user_state}`}</h3>
            <h3>Sports</h3>
          <button onClick={ () => window.history.back()}>Back</button>
          </div>
        </div>
        : 
        <Redirect to='/'/>
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