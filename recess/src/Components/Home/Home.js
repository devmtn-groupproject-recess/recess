import React, {useEffect, useState} from 'react'
import './Home.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {checkUser} from '../../Redux/reducers/users'
import {getSubscribedEvents} from '../../Redux/reducers/events'
import axios from 'axios'
import Map from '../Maps/Map'

const Key = process.env.REACT_APP_GOOGLE_API_KEY


function Home(props) {

  const [location, setLocation] = useState()
  const [subscribedGames, setSubGames] = useState([])


  useEffect(() => {
    props.checkUser()
    
    async function getSubGames (){
      const res = await props.getSubscribedEvents()
      .then(res => setSubGames( [...res.value.data]))
      
    }
    getSubGames()


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
       onMount: addMarkers(subscribedGames.filter( se => {
        return new Date(se.event_date) > new Date()
      }))
      }

  return (
    <div className='home'>
    <div className="scoreboard">
    {subscribedGames ? <Map className='mapComp' {...mapProps}></Map> : null}
      
      { props.user ?
        <div className="eigt1">
          <div className='extra'>
            <h1 className="eigtTitle">Upcoming Games</h1>

          </div>
          
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
                <div className="padme eventDetails" key={index} onClick={ () => props.history.push(`/events/${singleEvent.event_id}`)}>
                  <div>
                  <img height='100px' src={singleEvent.event_type} />
                  </div>
                  <div>
                  <h3 className="">{`${singleEvent.event_name}`}</h3>
                  <p>{`${singleEvent.event_city}, ${singleEvent.event_state}`}</p>
                  <p>{`${showDate} ${showTime}`}</p>
                  </div>
                </div>
              )
            })
          }
          <div className='extra' >
            <h1 className="eigtTitle">Past Games</h1>

          </div>
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
                <div  className="eventDetails" key={index} onClick={ () => props.history.push(`/events/${singleEvent.event_id}`)}>
                   <div>
                          <img height='100px' src={singleEvent.event_type} />
                  </div>
                  <div>
                  <h3>{`${singleEvent.event_name}`}</h3>
                  <p>{`${singleEvent.event_city}, ${singleEvent.event_state}`}</p>
                  <p>{`${showDate} ${showTime}`}</p>
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

  </div>)
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