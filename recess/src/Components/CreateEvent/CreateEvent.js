import React, {useEffect, useState, useCallback} from 'react'
import './CreateEvent.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {checkUser} from '../../Redux/reducers/users'
import {createEvent} from '../../Redux/reducers/events'
import axios from 'axios'
import Map from '../Maps/Map'

const Key = process.env.REACT_APP_GOOGLE_API_KEY

function CreateEvent(props) {
    console.log('render')
    
    let [eventInfo, setEventInfo] = useState({
        event_name: '',
        event_type: '',
        event_date: '',
        event_time: '',
        event_description: '',
        event_location_lat: null,
        event_location_long: null,
        event_city: '',
        event_state:'',
        location: null
    })
    console.log(eventInfo)
    useEffect( () => {
        console.log('hello')
        props.checkUser()
        axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${Key}`)
        .then(result => setEventInfo({...eventInfo, location: {lat: result.data.location.lat, lng: result.data.location.lng}}))
        },[])

    let handleChange = useCallback((event) => {
        const {name, value} = event.target
        setEventInfo({
          ...eventInfo,
          [name]: value 
        })
        
      })

    let handleType =(name, type) => {
        setEventInfo({
            ...eventInfo,
            [name]: type

        })
    }

    let handleCreate = () => {
        props.createEvent(eventInfo)
        props.history.push('/home')
    }
    // let handleDrag = (lat, long) => {
    //     console.log(444444, lat, long)
    //      setEventInfo({
             
    //          ...eventInfo, 
    //         event_location_long: long, 
    //         event_location_lat: lat,
    //         })
    // }
    
      const addMarkers = (links, current) => map => {
        links.forEach((link, index) => {

          const marker = new window.google.maps.Marker({
            map,
            position: eventInfo.location,
            label: `${index + 1}`,
            title: link.title,
            draggable: true,
            crossOnDrag: false,
            
          })
          marker.addListener('dragend', () => {
            //handleDrag(marker.getPosition().lat(), marker.getPosition().lng()) 
            // console.log(marker.getPosition().lng())
            // console.log(marker.getPosition().lat())
            setEventInfo({

                         ...current, 
                        event_location_long: marker.getPosition().lng(), 
                        event_location_lat: marker.getPosition().lat(),
                        })
           
        })

          marker.addListener(`click`, () => {
            console.log(eventInfo)
            // console.log(marker.getPosition().lng())
            // console.log(marker.getPosition().lat())
          })
        })
      }
      let linksfromthedepths = [{
          title: 'For the Glory',
          url: 'hereisURL',
          coords: eventInfo.location
      }]
        let mapProps = {
        options: {
          center: eventInfo.location,
          zoom: 15,
        },
        onMount: addMarkers(linksfromthedepths, eventInfo)
      }
      const MemoMap = useCallback(<Map{...mapProps} />, [eventInfo.location])

    return(
        <div>
            {props.user && eventInfo.location?
                <div>
                    {/* <Map {...mapProps}  /> */}
                    {MemoMap}
                    <input className="input"
                    placeholder='Event Name'
                    type='text'
                    name='event_name'
                    onChange={(event) => handleChange(event)}
                    />
                    <br/> 
                    <div class="dropdown">
                        <input 
                        class="input"
                        placeholder='Event Type'
                        name='event_type'
                        value={eventInfo.event_type} 
                        />
                        <div class="dropdown-content">
                            <p onClick={() => handleType('event_type',"Basketball")}>Basketball</p>
                            {/* <p>Link 1</p>
                            <p>Link 1</p> */}
                        </div>
                    </div>
                    
                    <br/> 

                    <input className="input"
                    placeholder='YYYY-MM-DD'
                    type='text'
                    name='event_date'
                    onChange={(event) => handleChange(event)}
                    /> 
                    <br/> 

                    <input className="input"
                    placeholder='HH:MM'
                    type='text'
                    name='event_time'
                    onChange={(event) => handleChange(event)}
                    /> 
                    <br/> 

                    <input className="input"
                    placeholder='Description'
                    type='text'
                    name='event_description'
                    onChange={(event) => handleChange(event)}
                    /> 
                    <br/> 

                    {/* <div class="dropdown">
                        <input 
                        class="input"
                        placeholder='AM/PM'
                        name='event_amPm'
                        value={`${eventInfo.event_amPm}`} />
                        <div class="dropdown-content">
                            <p onClick={() => handleType('event_amPm','AM')}>"AM"</p>
                            <p onClick={() => handleType('event_amPm','PM')}>'PM'</p>                          
                        </div>
                    </div>
                    <br/>   */}
                     
                    {/* <input className="input"
                    placeholder='Location Latitude'
                    type='number'
                    name='event_location_lat'
                    onChange={(event) => handleChange(event)}
                    />
                    <br/>   
                    <input className="input"
                    placeholder='Location Longitude'
                    type='text'
                    name='event_location_long'
                    onChange={(event) => handleChange(event)}
                    /> 
                    <br/>   */}
                    
                    <input className="input"
                    placeholder='City'
                    type='text'
                    name='event_city'
                    onChange={(event) => handleChange(event)}
                    /> 
                    <br/>  
                    <input className="input"
                    placeholder='State'
                    type='text'
                    name='event_state'
                    onChange={(event) => handleChange(event)}
                    />  
                    <br/> 
                    <button className="btn"
                    onClick={ () => handleCreate()}>Create</button>
                    <button className='btn'
                    onClick={ () => window.history.back()}>Back</button>

                </div>
                
            :
            <div>

            </div>
            // <Redirect to='/' />
            }

        </div>
    )
}

let mapDispatchToProps = {
    checkUser,
    createEvent
}

let mapStateToProps = state => {
    return{
        user:state.users.data
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent)