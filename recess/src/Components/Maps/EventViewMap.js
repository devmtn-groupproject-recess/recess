//map that pops up with a marker at the center and centered on the marker

import React, {useEffect, useState} from 'react'
import Map from './Map'
//import axios from 'axios'

//const Key = process.env.REACT_APP_GOOGLE_API_KEY

export default function EventViewMap () {
const [location, setLocation] = useState()
useEffect(() => {
    //  make an axios call to get the event coordinates, and set them to location
    // maybe have the event be on state instead of location. then pull all the data
    // to display it off of state
    //axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${Key}`)
     setLocation({ lat: 32.836504, lng: -116.973559 })
     
  }, [])
  

  const addMarkers = links => map => {
    links.forEach((link, index) => {
        
      const marker = new window.google.maps.Marker({
        map,
        position: location,
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
      coords: location
  }]

let mapProps = {
        options: {
          center: location,
          zoom: 15,
        },
        onMount: addMarkers(linksfromthedepths)
      }
return(
   
    <Map {...mapProps}></Map> 
)
}