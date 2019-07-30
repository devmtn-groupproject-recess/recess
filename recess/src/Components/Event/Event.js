import React, {useEffect, useState} from 'react'
import './Event.css'
import io from 'socket.io-client'
import {getEvent, checkUserSubscribedEvents, subscribeToEvent, unsubscribeToEvent, deleteEvent} from '../../Redux/reducers/events'
import {checkUser} from '../../Redux/reducers/users'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createMessage, getMessages} from '../../Redux/reducers/messages'

function Event(props) {

  let [messageBody, setMessageBody] = useState({
    messages: [],
  })

  let socket = io(`/events/${props.match.params.event_id}`)

  useEffect(   () => {
    // props.getSubscribedEvents()
    props.checkUser()
    props.checkUserSubscribedEvents(props.match.params.event_id)
    props.getEvent(props.match.params.event_id)
    props.getMessages(props.match.params.event_id)
    
    // socket.on('chat-message', message => {
    //   setMessageBody({
    //     messages: [message, ...messageBody.messages]  
    //   })
    // })
  }, [])

  let handleSubscribeToEvent = () => {
    props.subscribeToEvent(props.match.params.event_id)
  }

  let handleUnsubscribeToEvent = () => {
    props.unsubscribeToEvent(props.match.params.event_id)
    props.history.push('/home')
  }

  let handleDelete = () => {
    props.deleteEvent(props.match.params.event_id)
    props.history.push('/home')
  }

  let handleSubmit = e => {
    const body = e.target.value
    if (e.keyCode === 13 && body) {
      const message = {
        body,
        from: props.user.data.username
      }
      setMessageBody({
        messages: [message, ...messageBody.messages]  
      })
      props.createMessage({message_content: message.body}, props.match.params.event_id)
      // socket.emit('message', body)
      e.target.value = ''
    }
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
              <button onClick={() => props.history.push('/')}>Back</button>
              {new Date(event.event_date) > new Date() &&
                <div>
                  {props.subscribedEvent ?
  
                  <button onClick={() => handleUnsubscribeToEvent()}>Unsubscribe</button>
  
                  :
                
                  <button onClick={ () => handleSubscribeToEvent()}>Subscribe</button>
                  }
  
                  {Number(event.event_creator_id) === Number(props.user.data.user_id) &&
  
                  <button onClick={ () => handleDelete()} >Delete Event</button>  
  
                  }

                </div>

              }
            </div>
            <div className="chatBox"><h1>The Huddle</h1>
              <div>
                { props.messages && 
                <div>
                  {props.messages.map((oldMessage, index) => {
                    console.log(111111, oldMessage)
                    return <ul key={index}><b>{oldMessage.username}: </b>{oldMessage.message_content}</ul>
                  })}
                </div>

                }
                {/* <div>
                {
                  messageBody.messages.map((message, index) => {
                    return <ul key={index}><b>{message.from}: </b>{message.body}</ul>
                  })
                }
                </div>  */}
                
                <input type='text' placeholder='Enter a message...' onKeyUp={ (e) => handleSubmit(e)}/>
              </div>
            </div>
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
    subscribedEvent: state.events.data,
    messages: state.messages.data
  }
}

let mapDispatchToProps = {
  getEvent,
  checkUser, 
  checkUserSubscribedEvents,
  subscribeToEvent,
  unsubscribeToEvent,
  deleteEvent,
  createMessage,
  getMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);