import React from 'react'
import './Event.css'
import io from 'socket.io-client'

function Event() {
    return <div className='message-box'>
      <div className="googleMap">
        <p>Event Info</p>
      </div>
      <div className="chatBox">ChatBox</div>
    </div>
  }

  export default Event;