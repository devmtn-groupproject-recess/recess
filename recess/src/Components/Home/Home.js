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

  console.log(props)
  const {events} = props

  

  return (
    <div>
      { props.user ?
        <div>
          <h1>Events I'm Going To:</h1>
          {events &&
          events.map( singleEvent => {
            console.log(singleEvent)
            // let time = singleEvent.event_date.toLocaleTimeString('mt-US')
            // console.log(3333, time)
              return(
                <div>
                  <h3>{singleEvent.event_name}</h3>
                  <p>{`${singleEvent.event_city}, ${singleEvent.event_state}`}</p>
                  {/* <p>{time}</p> */}
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
  console.log(state)
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