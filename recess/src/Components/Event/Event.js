import React, {useEffect} from 'react'
import './Event.css'
import io from 'socket.io-client'
import {getEvent, checkUserSubscribedEvents, subscribeToEvent, unsubscribeToEvent} from '../../Redux/reducers/events'
import {checkUser} from '../../Redux/reducers/users'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

function Event(props) {

  useEffect(   () => {
    // props.getSubscribedEvents()
    props.checkUser()
    props.checkUserSubscribedEvents(props.match.params.event_id)
    props.getEvent(props.match.params.event_id)
  }, [])

  let handleSubscribeToEvent = () => {
    props.subscribeToEvent(props.match.params.event_id)
  }

  let handleUnsubscribeToEvent = () => {
    props.unsubscribeToEvent(props.match.params.event_id)
    props.history.push('/home')
  }

  console.log(props)

  let {event} = props
  
  return (
    <div className='message-box'>
      {props.user ?
      <div>
        {props.event &&
          <div>
            <div className="googleMap">
              <h1>Map Goes Here</h1>            
            </div>
            <div className="eventInfo">

              <h3>{event.event_name}</h3>
              <p><b>Sport Type</b>: {event.event_type}</p>
              <p><b>Date</b>: {new Date(event.event_date).toLocaleDateString()}</p>
              <p><b>Time</b>: {new Date(event.event_date).toLocaleTimeString()}</p>
              <p> <b>Description</b>: {event.event_description}</p>
              <p><b>Location</b>: {`${event.event_city}, ${event.event_state}`}</p>
              {props.subscribedEvent ?

              <button onClick={() => handleUnsubscribeToEvent()}>Unsubscribe</button>

              :

            
              <button onClick={ () => handleSubscribeToEvent()}>Subscribe</button>
              }
              {event.event_creator_id === props.user.user_id &&

              <p>You Created This Event</p>

              }
            </div>
            <div className="chatBox"><h1>Chat Box Goes Here</h1></div>
          </div>
        }

      </div>

      :

      <Redirect to='/' />
      }

    </div>

  )
}

let mapStateToProps = state => {
  console.log(state)
  return {
    event: state.events.selected,
    user: state.users.data,
    subscribedEvent: state.events.data
  }
}

let mapDispatchToProps = {
  getEvent,
  checkUser, 
  checkUserSubscribedEvents,
  subscribeToEvent,
  unsubscribeToEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);