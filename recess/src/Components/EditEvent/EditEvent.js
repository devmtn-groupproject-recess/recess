import React, {useState, useEffect, useCallback} from 'react'
import {checkUser} from '../../Redux/reducers/users'
import {getEvent, editEvent} from '../../Redux/reducers/events'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Map from '../Maps/Map'

import Frisbee from '../../assets/Frisbee.png'
import Football from '../../assets/Football.png'
import Basketball from '../../assets/Basketball.png'
import Baseball from '../../assets/Baseball.png'
import Volleyball from '../../assets/Volleyball.png'
import Spikeball from '../../assets/Spikeball.png'
import Soccer from '../../assets/Soccer.png'

function EditEvent(props) {

    let [editedInfo, setEditedInfo] = useState({
        event_name:'',
        event_type:'',
        // event_date:'',
        event_edit_time: '',
        event_edit_date: '',
        event_description:'',
        event_city:'',
        event_state:'',
        event_location_lat:'',
        event_location_long:'',
    })
    let [location, setLocation] = useState()

  

    useEffect( () => {
        if(!props.event) {
            props.checkUser()
            props.getEvent(props.match.params.event_id)
        }
        if(props.event) {
            setEditedInfo({
                ...editedInfo,
                event_name: props.event.event_name,
                event_type:props.event.event_type,
                event_description:props.event.event_description,
                event_city:props.event.event_city,
                event_state:props.event.event_state,
                event_location_lat:props.event.event_location_lat,
                event_location_long:props.event.event_location_long,
                event_edit_time:'',
                event_edit_time: ''
            })
        }
        async function fetch(){
            const res = await props.getEvent(props.match.params.event_id)
            .then(res => setLocation({lat: +res.value.data.event_location_lat, lng: +res.value.data.event_location_long}))
          }
          fetch()

    },[])

    const {user, event} = props
    
    let handleChange = event => {
        const {name, value} = event.target
        setEditedInfo({
          ...editedInfo,
          [name]: value 
        })
    }
        
      

      let handleType =(name, type) => {
        setEditedInfo({
            ...editedInfo,
            [name]: type,

        })
    }

    let handleEdit = async () => {
        const newDate = `${editedInfo.event_edit_date} ${editedInfo.event_edit_time}:00`
    // setEditedInfo({
    //     ...editedInfo,
    //     event_date: newDate
    // })

    for( let key in editedInfo){
      let input = editedInfo[key]
        if (!input){
            return alert('All fields must be filled in')
        }
    }

    

    
    await props.editEvent(props.match.params.event_id, {...editedInfo, event_date: newDate})
    setEditedInfo({
        event_name:'',
        event_type:'',
        // event_date:'',
        event_description:'',
        event_city:'',
        event_state:'',
        event_location_lat:'',
        event_location_long:'',
    })
    window.history.back()
    }

    const addMarkers = links => map => {
        links.forEach((link, index) => {
            
          const marker = new window.google.maps.Marker({
            map,
            position: {lat: +link.event_location_lat, lng: +link.event_location_long},
            label: ``,
            title: link.title,
            icon: {url: `${link.event_type}`,
              scaledSize: new window.google.maps.Size(50, 55)
            },
            draggable: true,
            crossOnDrag: false
          })
    
          marker.addListener('dragend', () => {
                    setEditedInfo({
                         ...editedInfo, 
                        event_location_long: marker.getPosition().lng(), 
                        event_location_lat: marker.getPosition().lat(),
                        })
           
            })
        })
      }
    
      let mapProps = {
        options: {
          center: location,
          zoom: 15,
        },
        onMount: addMarkers([event])}

      const MemoMap = useCallback(<Map{...mapProps} />, [location])
    return(
        <div>
            {props.user ?
                <div>
                    {MemoMap}
                    <input className="input"
                    value={editedInfo.event_name}
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
                        value={editedInfo.event_type} 
                        />
                        <div class="dropdown-content">
                            <p onClick={() => handleType('event_type', Basketball)}>Basketball</p>
                            <p onClick={() => handleType('event_type', Frisbee)}>Frisbee</p>
                            <p onClick={() => handleType('event_type', Football)}>Football</p>
                            <p onClick={() => handleType('event_type', Baseball)}>Baseball</p>
                            <p onClick={() => handleType('event_type', Soccer)}>Soccer</p>
                            <p onClick={() => handleType('event_type', Volleyball)}>Volleyball</p>
                            <p onClick={() => handleType('event_type', Spikeball)}>Spikeball</p>
                            
                        </div>
                    </div>
                    
                    <br/> 

                    <input className="input"
                    placeholder='YYYY-MM-DD'
                    value={editedInfo.event_edit_date}
                    type='text'
                    name='event_edit_date'
                    onChange={(event) => handleChange(event)}
                    /> 
                    <br/> 

                    <input className="input"
                    value={editedInfo.event_edit_time}
                    placeholder='HH:MM'
                    type='text'
                    name='event_edit_time'
                    onChange={(event) => handleChange(event)}
                    /> 
                    <br/> 

                    <input className="input"
                    value={editedInfo.event_description}
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
                    value={editedInfo.event_city}
                    type='text'
                    name='event_city'
                    onChange={(event) => handleChange(event)}
                    /> 
                    <br/>  
                    <input className="input"
                    value={editedInfo.event_state}
                    placeholder='State'
                    type='text'
                    name='event_state'
                    onChange={(event) => handleChange(event)}
                    />  
                    <br/> 
                    <button className="btn"
                    onClick={ () => handleEdit()}>Save</button>
                    <button className='btn'
                    onClick={ () => window.history.back()}>Back</button>

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
    getEvent,
    editEvent
}

let mapStateToProps = state => {
    console.log(state)
    return {
        user: state.users.data,
        event: state.events.selected
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent)