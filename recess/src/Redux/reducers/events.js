import Axios from 'axios'

let initialState = {
    data: null,
    selected: null,
    loading: null
}

const GET_EVENTS = 'GET_EVENTS'
const GET_EVENTS_PENDING = 'GET_EVENTS_PENDING'
const GET_EVENTS_FULFILLED = 'GET_EVENTS_FULFILLED'
const GET_EVENTS_REJECTED = 'GET_EVENTS_REJECTED'

const GET_EVENT = 'GET_EVENT'
const GET_EVENT_PENDING = 'GET_EVENT_PENDING'
const GET_EVENT_FULFILLED = 'GET_EVENT_FULFILLED'
const GET_EVENT_REJECTED = 'GET_EVENT_REJECTED'

const GET_SUBSCRIBED_EVENTS = 'GET_SUBSCRIBED_EVENTS'
const GET_SUBSCRIBED_EVENTS_PENDING = 'GET_SUBSCRIBED_EVENTS_PENDING'
const GET_SUBSCRIBED_EVENTS_FULFILLED = 'GET_SUBSCRIBED_EVENTS_FULFILLED'
const GET_SUBSCRIBED_EVENTS_REJECTED = 'GET_SUBSCRIBED_EVENTS_REJECTED'

const SUBSCRIBE_TO_EVENT = 'SUBSCRIBE_TO_EVENT'
const SUBSCRIBE_TO_EVENT_PENDING = 'SUBSCRIBE_TO_EVENT_PENDING'
const SUBSCRIBE_TO_EVENT_FULFILLED = 'SUBSCRIBE_TO_EVENT_FULFILLED'
const SUBSCRIBE_TO_EVENT_REJECTED = 'SUBSCRIBE_TO_EVENT_REJECTED'

const UNSUBSCRIBE_TO_EVENT = 'UNSUBSCRIBE_TO_EVENT'
const UNSUBSCRIBE_TO_EVENT_PENDING = 'UNSUBSCRIBE_TO_EVENT_PENDING'
const UNSUBSCRIBE_TO_EVENT_FULFILLED = 'UNSUBSCRIBE_TO_EVENT_FULFILLED'
const UNSUBSCRIBE_TO_EVENT_REJECTED = 'UNSUBSCRIBE_TO_EVENT_REJECTED'

const CREATE_EVENT = 'CREATE_EVENT'
const CREATE_EVENT_PENDING = 'CREATE_EVENT_PENDING'
const CREATE_EVENT_FULFILLED = 'CREATE_EVENT_FULFILLED'
const CREATE_EVENT_REJECTED = 'CREATE_EVENT_REJECTED'

const EDIT_EVENT = 'EDIT_EVENT'
const EDIT_EVENT_PENDING = 'EDIT_EVENT_PENDING'
const EDIT_EVENT_FULFILLED = 'EDIT_EVENT_FULFILLED'
const EDIT_EVENT_REJECTED = 'EDIT_EVENT_REJECTED'

const DELETE_EVENT = 'DELETE_EVENT'
const DELETE_EVENT_PENDING = 'DELETE_EVENT_PENDING'
const DELETE_EVENT_FULFILLED = 'DELETE_EVENT_FULFILLED'
const DELETE_EVENT_REJECTED = 'DELETE_EVENT_REJECTED'

export default function (state = initialState, action) {
    const {type, payload} = action

    switch(type) {
        case GET_EVENTS_PENDING:
            return {
                ...state,
                loading: true
            }
        case GET_EVENTS_FULFILLED:
            return{
                ...state,
                data:payload.data,
                loading:false
            }
        case GET_EVENTS_REJECTED:
            return {
                ...state,
                loading: false
            }

        case GET_EVENT_PENDING:
            return {
                ...state,
                loading: true
            }
        case GET_EVENT_FULFILLED:
            return{
                ...state,
                selected:payload.data,
                loading:false
            }
        case GET_EVENT_REJECTED:
            return {
                ...state,
                loading: false
            }

        case GET_SUBSCRIBED_EVENTS_PENDING:
            return {
                ...state,
                loading: true
            }
        case GET_SUBSCRIBED_EVENTS_FULFILLED:
            return{
                ...state,
                data:payload.data,
                loading:false
            }
        case GET_SUBSCRIBED_EVENTS_REJECTED:
            return {
                ...state,
                loading: false
            }

        case SUBSCRIBE_TO_EVENT_PENDING:
            return {
                ...state,
                loading: true
            }
        case SUBSCRIBE_TO_EVENT_FULFILLED:
            return{
                ...state,
                data:payload.data,
                loading:false
            }
        case SUBSCRIBE_TO_EVENT_REJECTED:
            return {
                ...state,
                loading: false
            }

        case UNSUBSCRIBE_TO_EVENT_PENDING:
            return {
                ...state,
                loading: true
            }
        case UNSUBSCRIBE_TO_EVENT_FULFILLED:
            return{
                ...state,
                data:payload.data,
                loading:false
            }
        case UNSUBSCRIBE_TO_EVENT_REJECTED:
            return {
                ...state,
                loading: false
            }

        case CREATE_EVENT_PENDING:
            return {
                ...state,
                loading: true
            }
        case CREATE_EVENT_FULFILLED:
            return{
                ...state,
                data:payload.data,
                loading:false
            }
        case CREATE_EVENT_REJECTED:
            return {
                ...state,
                loading: false
            }

        case EDIT_EVENT_PENDING:
            return {
                ...state,
                loading: true
            }
        case EDIT_EVENT_FULFILLED:
            return{
                ...state,
                data:payload.data,
                loading:false
            }
        case EDIT_EVENT_REJECTED:
            return {
                ...state,
                loading: false
            }

        case DELETE_EVENT_PENDING:
            return {
                ...state,
                loading: true
            }
        case DELETE_EVENT_FULFILLED:
            return{
                ...state,
                data:payload.data,
                loading:false
            }
        case DELETE_EVENT_REJECTED:
            return {
                ...state,
                loading: false
            }

        default: 
            return state
    }
}

export function getEvents() {
    return {
        type: GET_EVENTS,
        payload: Axios.post(`/api/events`)
    }
}

export function getEvent(event_id) {
    return {
        type: GET_EVENT,
        payload: Axios.post(`/api/events/${event_id}`)
    }
}

export function getSubscribedEvents() {
    return {
        type: GET_SUBSCRIBED_EVENTS,
        payload: Axios.post(`/api/events`)
    }
}

export function subscribeToEvent(event_id) {
    return {
        type: SUBSCRIBE_TO_EVENT,
        payload: Axios.post(`/api/events/${event_id}`)
    }
}

export function unsubscribeToEvend(event_id) {
    return {
        type: UNSUBSCRIBE_TO_EVENT,
        payload: Axios.post(`/api/events/${event_id}`)
    }
}

export function createEvent(eventInfo) {
    return {
        type: CREATE_EVENT,
        payload: Axios.post(`/api/events`, eventInfo)
    }
}

export function editEvent(event_id, eventInfo) {
    return {
        type: EDIT_EVENT,
        payload: Axios.post(`/api/events/${event_id}`, eventInfo)
    }
}

export function deleteEvent(event_id) {
    return {
        type: DELETE_EVENT,
        payload: Axios.post(`/api/events/${event_id}`)
    }
}