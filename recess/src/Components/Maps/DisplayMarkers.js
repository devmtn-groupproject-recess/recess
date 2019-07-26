//this component will be used for the map view of the events. 
//It centers the map on your location and maps through an array to display markers(events)


import React, {useEffect, useState} from 'react'
import Map from './Map'
import axios from 'axios'

import Frisbee from '../assets/Frisbee.png'
import Football from '../assets/Football.png'
import Basketball from '../assets/Basketball.png'
import Baseball from '../assets/Baseball.png'
import Volleyball from '../assets/Volleyball.png'
import Spikeball from '../assets/Spikeball.png'
import Soccer from '../assets/Soccer.png'

const Key = process.env.REACT_APP_GOOGLE_API_KEY

export default function DisplayEventsMap () {
const [location, setLocation] = useState()
useEffect(() => {
      axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${Key}`)
      .then(result => setLocation({lat: result.data.location.lat, lng: result.data.location.lng}))
  }, [])
  
  const addMarkers = links => map => {
    links.forEach((link, index) => {
      const marker = new window.google.maps.Marker({
        map,
        position: link.coords,
        // label: `${index + 1}`,
        title: link.title,
        icon: {url: `${link.sport}`,
              scaledSize: new window.google.maps.Size(50, 55)
      },

      })
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<h1>${link.title}</h1>`
      })
      marker.addListener(`click`, () => {
        infoWindow.open(map, marker)
      })


    })
  }
  let linksfromthedepths = [{
      title: 'For the Glory',
      url: 'hereisURL',
      coords: {lat: 40.437669, lng: -111.888792},
      sport: Frisbee
  }, {
    title: 'For the Glory 2',
      url: 'hereisURL',
      coords: {lat: 40.437500, lng: -111.888000},
      sport: Football
  }, {
    title: 'For the Glory 3',
      url: 'hereisURL',
      coords: {lat: 40.437400, lng: -111.888000},
      sport: Baseball
  }, {
    title: 'For the Glory 4',
      url: 'hereisURL',
      coords: {lat: 40.437300, lng: -111.888000},
      sport: Soccer
  }, {
    title: 'For the Glory 5',
      url: 'hereisURL',
      coords: {lat: 40.437200, lng: -111.888000},
      sport: Basketball
  }, {
    title: 'For the Glory 6',
      url: 'hereisURL',
      coords: {lat: 40.437100, lng: -111.888000},
      sport: Volleyball
  }, {
    title: 'For the Glory 7',
      url: 'hereisURL',
      coords: {lat: 40.437000, lng: -111.888000},
      sport: Spikeball
  }]

let mapProps = {
        options: {
          center: location,
          zoom: 15,
        },
        onMount: addMarkers(linksfromthedepths)
      }
return(
   //<div>Icons made by <a href="https://www.flaticon.com/authors/mavadee" 
   //title="mavadee">mavadee</a> from <a href="https://www.flaticon.com/"     
   //title="Flaticon">www.flaticon.com</a> messages.attribution.is_licensed_by <a 
   //href="http://creativecommons.org/licenses/by/3.0/"     title="Creative Commons BY 3.0" 
   //target="_blank">CC 3.0 BY</a></div>

    location? <Map {...mapProps}></Map> : null
)
}