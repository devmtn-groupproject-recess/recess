import Axios from 'axios'

const initialState = {
    data: null,
    selected: null,
    loading: null
}

const GET_MESSAGES_FOR_EVENT = 'GET_MESSAGES_FOR_EVENT'
const GET_MESSAGES_FOR_EVENT_PENDING = 'GET_MESSAGES_FOR_EVENT_PENDING'
const GET_MESSAGES_FOR_EVENT_FULFILLED = 'GET_MESSAGES_FOR_EVENT_FULFILLED'
const GET_MESSAGES_FOR_EVENT_REJECTED = 'GET_MESSAGES_FOR_EVENT_REJECTED'

const CREATE_MESSAGE_FOR_EVENT = 'CREATE_MESSAGE_FOR_EVENT'
const CREATE_MESSAGE_FOR_EVENT_PENDING = 'CREATE_MESSAGE_FOR_EVENT_PENDING'
const CREATE_MESSAGE_FOR_EVENT_FULFILLED = 'CREATE_MESSAGE_FOR_EVENT_FULFILLED'
const CREATE_MESSAGE_FOR_EVENT_REJECTED = 'CREATE_MESSAGE_FOR_EVENT_REJECTED'

const EDIT_MESSAGE = 'EDIT_MESSAGE'
const EDIT_MESSAGE_PENDING = 'EDIT_MESSAGE_PENDING'
const EDIT_MESSAGE_FULFILLED = 'EDIT_MESSAGE_FULFILLED'
const EDIT_MESSAGE_REJECTED = 'EDIT_MESSAGE_REJECTED'

const DELETE_MESSAGE = 'DELETE_MESSAGE'
const DELETE_MESSAGE_PENDING = 'DELETE_MESSAGE_PENDING'
const DELETE_MESSAGE_FULFILLED = 'DELETE_MESSAGE_FULFILLED'
const DELETE_MESSAGE_REJECTED = 'DELETE_MESSAGE_REJECTED'

export default function (state = initialState, action) {
    const {type, payload} = action
    
    switch(type) {
        case GET_MESSAGES_FOR_EVENT_PENDING:
            return {
                ...state,
                loading: true
            }
        case GET_MESSAGES_FOR_EVENT_FULFILLED:
            return{
                ...state,
                data:payload.data,
                loading:false
            }
        case GET_MESSAGES_FOR_EVENT_REJECTED:
            return {
                ...state,
                loading: false
            }
        
        case CREATE_MESSAGE_FOR_EVENT_PENDING:
            return {
                ...state,
                loading: true
            }
        case CREATE_MESSAGE_FOR_EVENT_FULFILLED:
            return{
                ...state,
                data:payload.data,
                loading:false
            }
        case CREATE_MESSAGE_FOR_EVENT_REJECTED:
            return {
                ...state,
                loading: false
            }

        case EDIT_MESSAGE_PENDING:
            return {
                ...state,
                loading: true
            }
        case EDIT_MESSAGE_FULFILLED:
            return{
                ...state,
                data:payload.data,
                loading:false
            }
        case EDIT_MESSAGE_REJECTED:
            return {
                ...state,
                loading: false
            }

        case DELETE_MESSAGE_PENDING:
            return {
                ...state,
                loading: true
            }
        case DELETE_MESSAGE_FULFILLED:
            return{
                ...state,
                data:payload.data,
                loading:false
            }
        case DELETE_MESSAGE_REJECTED:
            return {
                ...state,
                loading: false
            }
        
        default:
            return state
    }
}

export function getMessages(event_id) {
    return {
        type: GET_MESSAGES_FOR_EVENT,
        payload: Axios.post(`/api/messages/${event_id}`)
    }
}

export function createMessage(messageInfo, event_id) {
    return {
        type: CREATE_MESSAGE_FOR_EVENT,
        payload: Axios.post(`/api/messages/${event_id}`, messageInfo)
    }
}

export function editMessage(event_id, message_id, editedInfo) {
    return {
        type: EDIT_MESSAGE,
        payload: Axios.post(`/api/messages/${event_id}/${message_id}`, editedInfo)
    }
}

export function deleteMessage(event_id, message_id) {
    return {
        type: DELETE_MESSAGE,
        payload: Axios.post(`/api/messages/${event_id}/${message_id}`)
    }
}