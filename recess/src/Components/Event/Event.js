//clean up the map so that the flag doens't reroute and so that the number is gone, maybe info window, etc.

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

  let [messageBody, setMessageBody] = useState({
    messages: [],
    message_content:'',
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
    
    
    
    async function fetch(){
      const res = await props.getEvent(props.match.params.event_id)
      .then(res => setLocation({lat: +res.value.data.event_location_lat, lng: +res.value.data.event_location_long}))
    }
    fetch()
    
  }, [])

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
      setMessageBody({
        ...messageBody,
        message_content: ''
      })
  }

  let handleprofile = (id) => {
    if(id === props.user.data.user_id){
      props.history.push(`/profile/${id}`)
    }
    else{
      props.history.push(`/otherprofile/${id}`)
    }
  }


  
  let {event} = props
  const addMarkers = links => map => {
    links.forEach((link, index) => {
        
      const marker = new window.google.maps.Marker({
        map,
        position: location,
        label: ``,
        title: link.title,
        icon: {url: `${link.event_type}`,
        scaledSize: new window.google.maps.Size(50, 55)
      },
        
      })
      marker.addListener(`click`, () => {
        //window.location.href = link.url
      })
    })
  }
  
  let mapProps = {
    options: {
      center: location,
      zoom: 15,
    },
    onMount: addMarkers([event])
  }
  return (
    <div className='event'> 
      {props.user ?
      <div className='event2'>
        {props.event && 
          <div className='contentWrapper'>
            
            <div className="googleMap">
              { location ? <Map className='mapComp' {...mapProps}></Map>  :null  }
            </div>
            <div className="eventInfo">
              
              {new Date(event.event_date) > new Date() &&
                <div className='btnContainer'>
                  <button className='btnn' onClick={() => window.history.back()}>Back</button>
                  {props.subscribedEvent ?
  
                  <button className='btnn' onClick={() => handleUnsubscribeToEvent()}>Unsubscribe</button>
  
                  :
                
                  <button className='btnn' onClick={ () => handleSubscribeToEvent()}>Subscribe</button>
                  }
  
                  {Number(event.event_creator_id) === Number(props.user.data.user_id) &&
                  <div>
                    <button className='btnn' onClick={ () => handleDelete()} >Delete Event</button>  
                    <button className='btnn' onClick={ () => props.history.push(`/events/edit/${props.match.params.event_id}`)}>Edit Event</button>
                  </div>

  
                  }

                </div>

              }
              <h3 className='eventTitle'>{event.event_name}</h3>
              <p className='eventInfo'><b>Sport Type</b>: {event.event_type}</p>
              <p className='eventInfo'><b>Date</b>: {new Date(event.event_date).toLocaleDateString()}</p>
              <p className='eventInfo'><b>Time</b>: {new Date(event.event_date).toLocaleTimeString()}</p>
              <p className='eventInfo'> <b>Description</b>: {event.event_description}</p>
              <p className='eventInfo'><b>Location</b>: {`${event.event_city}, ${event.event_state}`}</p>
            </div>
            <div className="chatBox">
              <h1 id='border' className='eventTitle '>The Huddle</h1>
              <div>
                { props.messages && 
                <div>
                  {props.messages.map((oldMessage, index) => {
                    return (
                    <div >
                      <p className='messageText' onClick={() => handleprofile(oldMessage.user_id)}  key={index}>
                      <b>{`${oldMessage.username} (${new Date(oldMessage.message_date).toLocaleDateString()} ${new Date(oldMessage.message_date).toLocaleTimeString()}) : `}</b>{oldMessage.message_content}
                      </p>
                    </div>
                      
                    )
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
                <div className='inputDiv'>
                  <input className='messageInput' type='text' value={messageBody.message_content} name='message_content'placeholder='Enter a message...' onChange={ (e) => handleChange(e)}/>
                  <button className=' btnn' onClick={ () => handleSubmit()}>Add Message</button>

                </div>
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