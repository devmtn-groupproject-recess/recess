import React, {useEffect, useState} from 'react'
import './Events.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {checkUser} from '../../Redux/reducers/users'
import {getEvents} from '../../Redux/reducers/events'

function Events(props) {

    useEffect( () => {
        props.checkUser()
        props.getEvents()
    },[])

    const {events} = props

    return(
        <div>
            <button onClick={ () => props.history.push('/events/createEvent')}>Create An Event</button>
            {props.user ?

            <div>
                <h1>Upcoming Events</h1>
                {events && events!== true &&
          events.filter( se => {
            return new Date(se.event_date) > new Date()
          })
          .sort( (a, b) => {
            return a.event_date > b.event_date ? -1: a.event_date < b.event_date ? 1: 0
          })
          .map( (singleEvent, index) => {
            console.log(singleEvent)
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

            :

            <Redirect to='/' />

            }
        </div>
    )
}

let mapDispatchToState = {
    checkUser,
    getEvents
}

let mapPropsToState = state => {
    console.log(state)
    return{
        user: state.users.data,
        events: state.events.data
    }
}

export default connect(mapPropsToState, mapDispatchToState)(Events)