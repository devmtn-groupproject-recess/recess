//this is the map that will appear when creating an event.
//both the map and the marker will center on your current location
//but the marker will be draggable and the dragend function will set
//the location to be the current coordinates

import React, {useEffect, useState} from 'react'
import Map from './Map'
import axios from 'axios'

const Key = process.env.REACT_APP_GOOGLE_API_KEY

export default function CreateEventMap () {
const [location, setLocation] = useState()
useEffect(() => {
      axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${Key}`)
      .then(result => setLocation({lat: result.data.location.lat, lng: result.data.location.lng}))
  }, [])
  

  const addMarkers = links => map => {
    links.forEach((link, index) => {
      const marker = new window.google.maps.Marker({
        map,
        position: location,
        label: `${index + 1}`,
        title: link.title,
        draggable: true,
        crossOnDrag: false,
        
      })
      marker.addListener('dragend', () => console.log(marker.getPosition().lat()))
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
    
    location? <Map {...mapProps}></Map> : null
)
}