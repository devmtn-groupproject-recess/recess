import React, {useState, useEffect} from 'react'
import {checkUser} from '../../Redux/reducers/users'
import {getEvent, editEvent} from '../../Redux/reducers/events'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

function EditEvent(props) {

    let [editedInfo, setEditedInfo] = useState({
        event_name:'',
        event_type:'',
        event_date:'',
        event_description:'',
        event_city:'',
        event_state:'',
        event_location_lat:'',
        event_location_long:'',
    })

    console.log(props)
    console.log(editedInfo)

    useEffect( () => {
        if(!props.event) {
            props.checkUser()
            props.getEvent(props.match.params.event_id)
        }
        if(props.event) {
            setEditedInfo({
                event_name: props.event.event_name,
                event_type:props.event.event_type,
                event_date:props.event.event_date,
                event_description:props.event.event_description,
                event_city:props.event.event_city,
                event_state:props.event.event_state,
                event_location_lat:props.event.event_location_lat,
                event_location_long:props.event.event_location_long,
            })
        }

    },[])

    const {user, event} = props
    
    let handleChange = event => {
        const {name, value} = event.target
        setEditedInfo({
          ...editedInfo,
          [name]: value 
        })
        console.log(editedInfo)
    }
        
      

      let handleType =(name, type) => {
        setEditedInfo({
            ...editedInfo,
            [name]: type

        })
    }

    let handleEdit = async () => {
        console.log("New Props: ", props)
    for( let key in editedInfo){
      let input = editedInfo[key]
        if (!input){
            return alert('All fields must be filled in')
        }
    }
    await props.editEvent(props.match.params.event_id, editedInfo)
    setEditedInfo({
        event_name:'',
        event_type:'',
        event_date:'',
        event_description:'',
        event_city:'',
        event_state:'',
        event_location_lat:'',
        event_location_long:'',
    })
    window.history.back()
    }

    return(
        <div>
            {props.user ?
            // eventInfo.location?
                <div>
                    {/* <Map {...mapProps}  /> */}
                    {/* {MemoMap} */}
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
                            <p onClick={() => handleType('event_type',"Basketball")}>Basketball</p>
                            {/* <p>Link 1</p>
                            <p>Link 1</p> */}
                        </div>
                    </div>
                    
                    <br/> 

                    {/* <input className="input"
                    placeholder='YYYY-MM-DD'
                    value={editedInfo.event_date}
                    type='text'
                    name='event_date'
                    onChange={(event) => handleChange(event)}
                    /> 
                    <br/> 

                    <input className="input"
                    value={editedInfo.event}
                    placeholder='HH:MM'
                    type='text'
                    name='event_time'
                    onChange={(event) => handleChange(event)}
                    /> 
                    <br/>  */}

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