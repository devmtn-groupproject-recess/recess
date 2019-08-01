import React,{useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {getEvents} from '../../Redux/reducers/events'
import {checkUser} from '../../Redux/reducers/users'
import axios from 'axios'
import Map from '../Maps/Map'
import {Redirect} from 'react-router-dom'
import './Events.css'


import Frisbee from '../../assets/Frisbee.png'
import Football from '../../assets/Football.png'
import Basketball from '../../assets/Basketball.png'
import Baseball from '../../assets/Baseball.png'
import Volleyball from '../../assets/Volleyball.png'
import Spikeball from '../../assets/Spikeball.png'
import Soccer from '../../assets/Soccer.png'

const Key = process.env.REACT_APP_GOOGLE_API_KEY

function Events (props) {

    const [location, setLocation] = useState()
    const [games, setGames] = useState([])

    useEffect(() => {
        props.checkUser()
        
        async function getGames (){
          const res = await props.getEvents()
          .then(res => setGames( [...res.value.data]))
          
        }
        getGames()
        

        axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${Key}`)
        .then(result => 
        setLocation({lat: +result.data.location.lat, lng: +result.data.location.lng}))


    }, [])

 const addMarkers = links => map => {
    links.forEach((link, index) => {
      const marker = new window.google.maps.Marker({
        map,
        position: {lat: +link.event_location_lat, lng: +link.event_location_long},
        label: ``,
        title: link.event_name,
        icon: {url: `${link.event_type}`,
              scaledSize: new window.google.maps.Size(50, 55)
      },

      })
  
     
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="color:indigo;display:flex;flex-direction:column;align-items:center;justify-content:center"><h2>${link.event_name}</h2><h4>${new Date(link.event_date).toLocaleDateString()}</h4><h4>${new Date(link.event_date).toLocaleTimeString()}</h4></div>`
      })

      marker.addListener(`click`, () => {
        infoWindow.open(map, marker)
      })  
      marker.addListener('dblclick', () => props.history.push(`/events/${link.event_id}`))
      
    })
}
    const {events} = props
    let mapProps = {
        options: {
          center: location,
          zoom: 14,
        },
     onMount: addMarkers(games)
      }

    return(
        <div className='bracketBoard'>
            {games ?<Map className='mapComp' {...mapProps}></Map>: null}
            {/* <button onClick={ () => props.history.push('/events/createEvent')}>Create An Event</button> */}
            {props.users ?

            <div className="planner">
                <h1 className="title">Upcoming Events</h1>
                <button className="button" onClick={ () => props.history.push('/events/createEvent')}>Create An Event</button>
                {events && events!== true &&
                events.filter( se => {
                  return new Date(se.event_date) > new Date()
                })
                .sort( (a, b) => {
                  return a.event_date < b.event_date ? -1: a.event_date > b.event_date ? 1: 0
                })
                .map( (singleEvent, index) => {
                  let timeDate = new Date(singleEvent.event_date)
                  let showTime = timeDate.toLocaleTimeString()
                  let showDate = timeDate.toLocaleDateString()
                
                    return(
                      <div className='eventRow' key={index} onClick={ () => props.history.push(`/events/${singleEvent.event_id}`)}>
                        <div>
                          <img height='100px' src={singleEvent.event_type} />
                        </div>
                        <div>
                          <h3 className="eventDeets">{`${singleEvent.event_name}`}</h3>
                          <p className="eventDeets">{`${singleEvent.event_city}, ${singleEvent.event_state}`}</p>
                          <p className="eventDeets">{`${showDate} ${showTime}`}</p>
                        </div>
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
        events: state.events.data,
        users: state.users.data
    }
}
export default connect(mapStateToProps, {getEvents, checkUser})(Events)

  

/*
"/static/media/Frisbee.6c4391c4.png"
"/static/media/Football.d7871bd3.png"
"/static/media/Baseball.0b418eb4.png"
"/static/media/Soccer.c24857e4.png"
"/static/media/Basketball.4a05ae25.png"
"/static/media/Volleyball.46cd06e3.png"
"/static/media/Spikeball.aca5a624.png"
*/


//<div>Icons made by <a href="https://www.flaticon.com/authors/mavadee" 
   //title="mavadee">mavadee</a> from <a href="https://www.flaticon.com/"     
   //title="Flaticon">www.flaticon.com</a> messages.attribution.is_licensed_by <a 
   //href="http://creativecommons.org/licenses/by/3.0/"     title="Creative Commons BY 3.0" 
   //target="_blank">CC 3.0 BY</a></div>
