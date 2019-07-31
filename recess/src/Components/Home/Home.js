import React, {useEffect, useState} from 'react'
import './Home.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {checkUser} from '../../Redux/reducers/users'
import {getSubscribedEvents} from '../../Redux/reducers/events'

function Home(props) {

  useEffect( () => {
    props.checkUser()
    props.getSubscribedEvents()
  }, [])

  const {events} = props
  

  return (
    <div className="scoreboard">
      { props.user ?
        <div className="eigt1">
          <h1 className="eigtTitle">Events I'm Going To:</h1>
          
          {events && events!== true &&
          events.filter( se => {
            return new Date(se.event_date) > new Date()
          })
          .sort( (a, b) => {
            return a.event_date > b.event_date ? -1: a.event_date < b.event_date ? 1: 0
          })
          .map( (singleEvent, index) => {
            let timeDate = new Date(singleEvent.event_date)
            let showTime = timeDate.toLocaleTimeString()
            let showDate = timeDate.toLocaleDateString()

              return(
                <div className="padme" key={index} onClick={ () => props.history.push(`/events/${singleEvent.event_id}`)}>
                  <h3 className="eventDetails">{`${singleEvent.event_name}`}</h3>
                  <p>{`${singleEvent.event_city}, ${singleEvent.event_state}`}</p>
                  <p>{`${showDate} ${showTime}`}</p>
                </div>
              )
            })
          }
          <h1 className="eigtTitle">Events I've Gone To:</h1>
          {events && events!== true &&
          events.filter( se => {
            return new Date(se.event_date) < new Date()
          })
          .sort( (a, b) => {
            return a.event_date > b.event_date ? -1: a.event_date < b.event_date ? 1: 0
          })
          .map( (singleEvent, index) => {
            let timeDate = new Date(singleEvent.event_date)
            let showTime = timeDate.toLocaleTimeString()
            let showDate = timeDate.toLocaleDateString()

              return(
                <div key={index} onClick={ () => props.history.push(`/events/${singleEvent.event_id}`)}>
                  <h3 className="eventDetails">{`${singleEvent.event_name}`}</h3>
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

let mapStateToProps = state => {
  return{
    user: state.users.data,
    events: state.events.data
  }
}

let mapDispatchToProps = {
  checkUser,
  getSubscribedEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);