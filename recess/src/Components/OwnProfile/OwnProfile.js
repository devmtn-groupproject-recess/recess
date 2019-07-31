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
              <h1>{`${props.selected.user_first_name} ${props.selected.user_last_name}`}</h1>
              <h2>{props.selected.username}</h2>
              <h3>{`${props.selected.user_city}, ${props.selected.user_state}`}</h3>
              <h3>Sports</h3>
              <button onClick={() => props.history.push(`/profile/edit/${props.match.params.user_id}`)}>Edit</button>
              {props.events && 
                <div>
                  <h1>Events I Created:</h1>
                  {props.events.map( (singleEvent, index) => {
                    let timeDate = new Date(singleEvent.event_date)
                    let showTime = timeDate.toLocaleTimeString()
                    let showDate = timeDate.toLocaleDateString()
                  
                      return(
                        <div key={index} onClick={ () => props.history.push(`/events/${singleEvent.event_id}`)}>
                          <h3>{`${singleEvent.event_name} - ${singleEvent.event_type}`}</h3>
                          <p>{`${singleEvent.event_city}, ${singleEvent.event_state}`}</p>
                          <p>{`${showDate} ${showTime}`}</p>
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