import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import './OwnProfile.css'
import {getUser, checkUser} from '../../Redux/reducers/users'
import {getUserCreatedEvent} from '../../Redux/reducers/events'

function OwnProfile(props) {
  useEffect(() => {
    props.checkUser()
    props.getUser(props.match.params.user_id)
    props.getUserCreatedEvent()
  }, [])
  console.log(1234556, props)
    return (
      
      <div>
      { props.user ? 
        <div className='background'>
          {props.selected && 
            <div className="playerCard">
              <img className="profilePic" src={props.selected.user_img}/>
              <h1 className="letteringSport">{`${props.selected.user_first_name} ${props.selected.user_last_name}`}</h1>
              <h2 className="letteringText">{props.selected.username}</h2>
              <h3 className="letteringText">{`${props.selected.user_city}, ${props.selected.user_state}`}</h3>
              <h3 className="letteringText">Sports</h3>
              <button id='more' className="btn" onClick={() => props.history.push(`/profile/edit/${props.match.params.user_id}`)}>Edit Profile</button>
              {props.events && props.events !== true &&
                <div>
                  <h1 className="letteringSport">Games I Added</h1>
                  {props.events.map( (singleEvent, index) => {
                    let timeDate = new Date(singleEvent.event_date)
                    let showTime = timeDate.toLocaleTimeString()
                    let showDate = timeDate.toLocaleDateString()
                  
                      return(
                        <div className='indEvent' key={index} onClick={ () => props.history.push(`/events/${singleEvent.event_id}`)}>
                          <h3 className="letteringText">{`${singleEvent.event_name}`}</h3>
                          <p className="letteringText">{`${singleEvent.event_city}, ${singleEvent.event_state}`}</p>
                          <p className="letteringText">{`${showDate} ${showTime}`}</p>
                        </div>
                      )
                    })
                  }
                </div>
    
              }
            </div>

          }

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
      selected: state.users.selected,
      events: state.events.data
    }
  }

  export default connect(mapStateToProps, {getUser, checkUser, getUserCreatedEvent})(OwnProfile);