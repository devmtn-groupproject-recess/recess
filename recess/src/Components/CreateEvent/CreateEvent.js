import React, {useEffect, useState, useCallback} from 'react'
import './CreateEvent.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {checkUser} from '../../Redux/reducers/users'
import {createEvent} from '../../Redux/reducers/events'
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

function CreateEvent(props) {
    
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
            label: ``,
            title: link.title,
            draggable: true,
            crossOnDrag: false,
            
          })
          marker.addListener('dragend', () => {
            //handleDrag(marker.getPosition().lat(), marker.getPosition().lng()) 
            // console.log(marker.getPosition().lng())
            // console.log(marker.getPosition().lat())
            setEventInfo({

                         ...eventInfo, 
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
        onMount: addMarkers(linksfromthedepths)
      }
      const MemoMap = useCallback(<Map{...mapProps} />, [eventInfo.location])
    return(
        <div className='outerCreate'>
            {props.user? 
            <div className='createContentDiv'>
              <h1 className='title'>Add Game</h1>
              { eventInfo.location &&
                <div className='mapDivContainer'>
                  {MemoMap}

                </div>


              }
                <div className='inputsDivContainer'>
                    <div className='eInfoTitleDiv'>
                      <h3 className='eInfoTitle'>Game Info:</h3>
                    </div>
                    {/* <Map {...mapProps}  /> */}
                    <div className='theInputs'>
                      <div className='theDivs'>
                        <input className='ceInput'
                        placeholder='Name'
                        type='text'
                        name='event_name'
                        onChange={(event) => handleChange(event)}
                        />
                        <br/> 
                        <div class="dropdown">
                            <input
                            readOnly 
                            className='ceInputDD'
                            placeholder='Which Game?'
                            name='event_type'
                            value={eventInfo.event_type} 
                            />
                            <div class="dropdown-content">
                                <p onClick={() => handleType('event_type', Basketball, )}>Basketball</p>
                                <p onClick={() => handleType('event_type', Frisbee)}>Frisbee</p>
                                <p onClick={() => handleType('event_type', Football)}>Football</p>
                                <p onClick={() => handleType('event_type', Baseball)}>Baseball</p>
                                <p onClick={() => handleType('event_type', Soccer)}>Soccer</p>
                                <p onClick={() => handleType('event_type', Volleyball)}>Volleyball</p>
                                <p onClick={() => handleType('event_type', Spikeball)}>Spikeball</p>
                                
                            </div>
                        </div>

                      </div>

                      
                      <br/> 

                      <div className='theDivs'>
                        <input className='ceInput'
                        placeholder='YYYY-MM-DD'
                        type='text'
                        name='event_date'
                        onChange={(event) => handleChange(event)}
                        /> 
                        <br/> 
      
                        <input className='ceInput'
                        placeholder='HH:MM'
                        type='text'
                        name='event_time'
                        onChange={(event) => handleChange(event)}
                        /> 

                      </div>
    
                      <br/> 

                      <div className='theDivs'>
                        <input className='ceInput'
                        placeholder='Description'
                        type='text'
                        name='event_description'
                        onChange={(event) => handleChange(event)}
                        /> 
                        <br/> 
                        
                        <input className='ceInput'
                        placeholder='City'
                        type='text'
                        name='event_city'
                        onChange={(event) => handleChange(event)}
                        /> 

                      </div>
    
                      <br/>  
                      <input className='ceInput'
                      placeholder='State'
                      type='text'
                      name='event_state'
                      onChange={(event) => handleChange(event)}
                      />  
                      <br/> 
                      <div className='theDivs'>
                        <button className="btn"
                        onClick={ () => handleCreate()}>Add</button>
                        <button className='btn'
                        onClick={ () => window.history.back()}>Back</button>

                      </div>
                    </div>
  
                </div>
  
              

            </div>
            
                
            :
            <div>
              <Redirect to='/' />

            </div>
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