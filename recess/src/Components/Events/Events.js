import React, {useEffect, useState} from 'react'
import './Events.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {checkUser} from '../../Redux/reducers/users'
import {getEvents} from '../../Redux/reducers/events'

function Events(props) {

    useEffect( () => {
        props.checkUser()
        props.getEvents()
    },[])

    return(
        <div>
            Events Page
        </div>
    )
}

let mapDispatchToState = {
    checkUser,
    getEvents
}

let mapPropsToState = state => {
    console.log(state)
    return{
        user: state.users.data,
        events: state.events.data
    }
}

export default connect(mapPropsToState, mapDispatchToState)(Events)