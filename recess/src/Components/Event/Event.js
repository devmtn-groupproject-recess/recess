import React, {useEffect, useState} from 'react'
import './Event.css'
// import io from 'socket.io-client'
import {getEvent, checkUserSubscribedEvents, subscribeToEvent, unsubscribeToEvent, deleteEvent} from '../../Redux/reducers/events'
import {checkUser} from '../../Redux/reducers/users'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {createMessage, getMessages} from '../../Redux/reducers/messages'
import Map from '../Maps/Map'

function Event(props) {
  console.log('render', 55555, props)
  let [messageBody, setMessageBody] = useState({
    messages: [],
    message_content:'',
    waste:0
  })
  let [location, setLocation] = useState()
  
  // let socket = io(`/events/${props.match.params.event_id}`)

  useEffect(() => {
        // socket.on('chat-message', message => {
    //   setMessageBody({
    //     messages: [message, ...messageBody.messages]  
    //   })
    // })
   
    props.checkUser()
    props.checkUserSubscribedEvents(props.match.params.event_id)
    props.getMessages(props.match.params.event_id)
    props.getEvent(props.match.params.event_id)
    
    if(props.event){
    setLocation({lat: +props.event.event_location_lat, lng: +props.event.event_location_long});console.log('LOCATION', location)}

    if(!location){setMessageBody({...messageBody, waste: messageBody.waste+=1}); console.log(5555, messageBody)}
    
    console.log(messageBody.waste) 
    console.log(location)
  }, [messageBody.waste])

  let handleSubscribeToEvent = () => {
    props.subscribeToEvent(props.match.params.event_id)
    props.history.push('/home')

  }

  let handleUnsubscribeToEvent = () => {
    props.unsubscribeToEvent(props.match.params.event_id)
    props.history.push('/home')
  }

  let handleDelete = () => {
    props.deleteEvent(props.match.params.event_id)
    props.history.push('/home')
  }

  let handleChange = (event) => {
    const {name, value} = event.target
    setMessageBody({
      ...messageBody,
      [name]: value 
    })
  }

  // let handleSubmit = e => {
  //   const body = e.target.value
  //   if (e.keyCode === 13 && body) {
  //     const message = {
  //       body,
  //       from: props.user.data.username
  //     }
  //     // setMessageBody({
  //     //   messages: [message, ...messageBody.messages]  
  //     // })
  //     props.createMessage({message_content: message.body}, props.match.params.event_id)
  //     // socket.emit('message', body)
  //     e.target.value = ''
  //   }
  // }

  let handleSubmit = () => {
      props.createMessage({message_content:messageBody.message_content}, props.match.params.event_id)
  }


  
  let {event} = props
  const addMarkers = links => map => {
    links.forEach((link, index) => {
        
      const marker = new window.google.maps.Marker({
        map,
        position: messageBody.location,
        label: `${index + 1}`,
        title: link.title,
        
      })
      marker.addListener(`click`, () => {
        window.location.href = link.url
      })
    })
  }
  let linksfromthedepths = [{
      title: 'For the Glory',
      url: 'hereisURL',
      coords: messageBody.location
  }]
  let mapProps = {
    options: {
      center: messageBody.location,
      zoom: 15,
    },
    onMount: addMarkers(linksfromthedepths)
  }
  return (
    <div className='message-box'> 
      {props.user ?
      <div>
        {props.event && 
          <div>
            
            <div className="googleMap">
              <h1>Map Goes Here</h1>
              {/* { messageBody.location? <Map {...mapProps}></Map>  :null  } */}
            </div>
            <div className="eventInfo">
              
              <h3>{event.event_name}</h3>
              <p><b>Sport Type</b>: {event.event_type}</p>
              <p><b>Date</b>: {new Date(event.event_date).toLocaleDateString()}</p>
              <p><b>Time</b>: {new Date(event.event_date).toLocaleTimeString()}</p>
              <p> <b>Description</b>: {event.event_description}</p>
              <p><b>Location</b>: {`${event.event_city}, ${event.event_state}`}</p>
              <button onClick={() => window.history.back()}>Back</button>
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
                    // console.log(111111, oldMessage)
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
                
                <input type='text' name='message_content'placeholder='Enter a message...' onChange={ (e) => handleChange(e)}/>
                <button onClick={ () => handleSubmit()}>Add Message</button>
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