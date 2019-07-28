import React, {useEffect} from 'react'
import './Event.css'
import io from 'socket.io-client'
import {getEvent} from '../../Redux/reducers/events'
import {checkUser} from '../../Redux/reducers/users'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

function Event(props) {

  useEffect(   () => {
    // props.getSubscribedEvents()
    props.checkUser()

    props.getEvent(props.match.params.event_id)
  }, [])

  console.log(props)

  let {event} = props
  
  return (
    <div className='message-box'>
      {props.user ?
      <div>
        {props.event &&
          <div>
            <div className="googleMap">
              Map Goes Here
            </div>
            <div className="eventInfo">

              <h3>Event Information</h3>
              <p>{event.event_name}</p>
              <p>{new Date(event.event_date).toLocaleTimeString()}</p>
              <p>{event.event_name}</p>
              <p>{event.event_name}</p>
              <p>{event.event_name}</p>
              <p>{event.event_name}</p>
              <p>{event.event_name}</p>
            </div>
            <div className="chatBox">ChatBox</div>
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
    user: state.users.data
  }
}

let mapDispatchToProps = {
  getEvent,
  checkUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);