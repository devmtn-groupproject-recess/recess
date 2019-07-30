import React,{useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {getEvents} from '../../Redux/reducers/events'
import axios from 'axios'
import Map from '../Maps/Map'

import Frisbee from '../../assets/Frisbee.png'
import Football from '../../assets/Football.png'
import Basketball from '../../assets/Basketball.png'
import Baseball from '../../assets/Baseball.png'
import Volleyball from '../../assets/Volleyball.png'
import Spikeball from '../../assets/Spikeball.png'
import Soccer from '../../assets/Soccer.png'


const Key = process.env.REACT_APP_GOOGLE_API_KEY

export function DisplayEventsMap (props) {
const [location, setLocation] = useState()
useEffect(() => {
        getEvents()
        console.log(33333, props.events)
    //     axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${Key}`)
    //   .then(result => 
    //     setLocation({lat: +result.data.location.lat, lng: +result.data.location.lng}))
  }, [])
  
  const addMarkers = links => map => {
    links.forEach((link, index) => {
      const marker = new window.google.maps.Marker({
        
        map,
        position: {lat: +link.event_location_lat, lng: +link.event_location_long},
        label: `${index + 1}`,
        title: link.event_name,
        icon: {url: `${link.event_type}`,
              scaledSize: new window.google.maps.Size(50, 55)
      },

      })
      console.log(marker)
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<h1>${link.event_name}</h1>`
      })
      marker.addListener(`click`, () => {
        infoWindow.open(map, marker)
      })  
    })
}

let mapProps = {
        options: {
          center: location,
          zoom: 15,
        },
        onMount: addMarkers(props.events)
      }
return(
    props.events && location ? <Map {...mapProps}></Map> : null
    )
}  

let mapStateToProps = state => {
    let{data: events} = state.events
    return {events}
}
export default connect(mapStateToProps, {getEvents})(DisplayEventsMap)




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
