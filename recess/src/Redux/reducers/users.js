import Axios from 'axios'

const initialState = {
    data: null,
    selected: null,
    loading: null
}

const GET_USER = 'GET_USER'
const GET_USER_PENDING = 'GET_USER_PENDING'
const GET_USER_FULFILLED = 'GET_USER_FULFILLED'
const GET_USER_REJECTED = 'GET_USER_REJECTED'

const CHECK_USER = 'CHECK_USER'
const CHECK_USER_PENDING = 'CHECK_USER_PENDING'
const CHECK_USER_FULFILLED = 'CHECK_USER_FULFILLED'
const CHECK_USER_REJECTED = 'CHECK_USER_REJECTED'

const EDIT_USER = 'EDIT_USER'
const EDIT_USER_PENDING = 'EDIT_USER_PENDING'
const EDIT_USER_FULFILLED = 'EDIT_USER_FULFILLED'
const EDIT_USER_REJECTED = 'EDIT_USER_REJECTED'

const FIRST_LOGIN = 'FIRST_LOGIN'
const FIRST_LOGIN_PENDING = 'FIRST_LOGIN_PENDING'
const FIRST_LOGIN_FULFILLED = 'FIRST_LOGIN_FULFILLED'
const FIRST_LOGIN_REJECTED = 'FIRST_LOGIN_REJECTED'

const LOGOUT_USER = 'LOGOUT_USER'
const LOGOUT_USER_PENDING = 'LOGOUT_USER_PENDING'
const LOGOUT_USER_FULFILLED = 'LOGOUT_USER_FULFILLED'
const LOGOUT_USER_REJECTED = 'LOGOUT_USER_REJECTED'

const LOGIN_USER = 'LOGIN_USER'
const LOGIN_USER_PENDING = 'LOGIN_USER_PENDING'
const LOGIN_USER_FULFILLED = 'LOGIN_USER_FULFILLED'
const LOGIN_USER_REJECTED = 'LOGIN_USER_REJECTED'

const REGISTER_USER = 'REGISTER_USER' 
const REGISTER_USER_PENDING = 'REGISTER_USER_PENDING'
const REGISTER_USER_FULFILLED = 'REGISTER_USER_FULFILLED'
const REGISTER_USER_REJECTED = 'REGISTER_USER_REJECTED'

const SUBSCRIBE_USER_TO_CATEGORY = 'SUBSCRIBE_USER_TO_CATEGORIES'
const SUBSCRIBE_USER_TO_CATEGORY_PENDING = 'SUBSCRIBE_USER_TO_CATEGORIES_PENDING'
const SUBSCRIBE_USER_TO_CATEGORY_FULFILLED = 'SUBSCRIBE_USER_TO_CATEGORIES_FULFILLED'
const SUBSCRIBE_USER_TO_CATEGORY_REJECTED = 'SUBSCRIBE_USER_TO_CATEGORIES_REJECTED'

const  GET_USERS_SUBSCRIBED_CATEGORIES= 'GET_USERS_SUBSCRIBED_CATEGORIES'
const  GET_USERS_SUBSCRIBED_CATEGORIES_PENDING= 'GET_USERS_SUBSCRIBED_CATEGORIES_PENDING'
const  GET_USERS_SUBSCRIBED_CATEGORIES_FULFILLED= 'GET_USERS_SUBSCRIBED_CATEGORIES_FULFILLED'
const  GET_USERS_SUBSCRIBED_CATEGORIES_REJECTED= 'GET_USERS_SUBSCRIBED_CATEGORIES_REJECTED'

export default function (state = initialState, action) {
    let {type, payload} = action
    console.log(action)

    switch(type) {
        case GET_USER_PENDING:
            return {
                ...state,
                loading: true
            }
        case GET_USER_FULFILLED:
            return{
                ...state,
                data:payload.data,
                loading:false
            }
        case GET_USER_REJECTED:
            return {
                ...state,
                loading: false
            }

        case EDIT_USER_PENDING:
            return {
                ...state,
                loading: true
            }
        case EDIT_USER_FULFILLED:
            return{
                ...state,
                data:payload.data,
                loading:false
            }
        case EDIT_USER_REJECTED:
            return {
                ...state,
                loading: false
            }

        case FIRST_LOGIN_PENDING:
            return {
                ...state,
                loading: true
            }
        case FIRST_LOGIN_FULFILLED:
            return{
                ...state,
                data:payload.data,
                loading:false
            }
        case FIRST_LOGIN_REJECTED:
            return {
                ...state,
                loading: false
            }

        case LOGOUT_USER_PENDING:
            return {
                ...state,
                loading: true
            }
        case LOGOUT_USER_FULFILLED:
            return{
                ...state,
                data:payload.data,
                loading:false
            }
        case LOGOUT_USER_REJECTED:
            return {
                ...state,
                loading: false
            }

        case LOGIN_USER_PENDING:
            return {
                ...state,
                loading: true
            }
        case LOGIN_USER_FULFILLED:
            return{
                ...state,
                data:payload.data,
                loading:false
            }
        case LOGIN_USER_REJECTED:
            alert("Username or Password is Incorrect")

            return {
                ...state,
                loading: false
            }

        case REGISTER_USER_PENDING:
            return {
                ...state,
                loading: true
            }
        case REGISTER_USER_FULFILLED:
            return{
                ...state,
                data:payload.data,
                loading:false
            }
        case REGISTER_USER_REJECTED:
            alert("Username is already in use. Please choose another username.")
            return {
                ...state,
                loading: false
            }

        case SUBSCRIBE_USER_TO_CATEGORY_PENDING:
            return {
                ...state,
                loading: true
            }
        case SUBSCRIBE_USER_TO_CATEGORY_FULFILLED:
            return{
                ...state,
                data:payload.data,
                loading:false
            }
        case SUBSCRIBE_USER_TO_CATEGORY_REJECTED:
            return {
                ...state,
                loading: false
            }

        case GET_USERS_SUBSCRIBED_CATEGORIES_PENDING:
            return {
                ...state,
                loading: true
            }
        case GET_USERS_SUBSCRIBED_CATEGORIES_FULFILLED:
            return{
                ...state,
                data:payload.data,
                loading:false
            }
        case GET_USERS_SUBSCRIBED_CATEGORIES_REJECTED:
            return {
                ...state,
                loading: false
            }

        case FIRST_LOGIN_PENDING:
            return {
                ...state,
                loading: true
            }
        case FIRST_LOGIN_FULFILLED:
            return{
                ...state,
                data: payload,
                loading:false
            }
        case FIRST_LOGIN_REJECTED:
            return {
                ...state,
                loading: false
            }

        case CHECK_USER_PENDING:
            return {
                ...state,
                loading: true
            }
        case CHECK_USER_FULFILLED:
            return{
                ...state,
                data: payload,
                loading:false
            }
        case CHECK_USER_REJECTED:
            return {
                ...state,
                loading: false
            }
        
        default:
            return state
    }
}

export function register(userInfo) {
    
    return {
        type: REGISTER_USER,
        payload: Axios.post(`/auth/register`, userInfo)
    }
}

export function login(loginInfo) {
    return {
        type: LOGIN_USER,
        payload: Axios.post(`/auth/login`, loginInfo)
    }
}

export function logout() {
    return {
        type: LOGOUT_USER,
        payload: Axios.post(`auth/logout`)
    }
}

export function editUser(userInfo) {
    return {
        type: EDIT_USER,
        payload: Axios.post(`user/editUser`, userInfo)
    }
}

export function getUser(user_id) {
    return {
        type: GET_USER,
        payload: Axios.post(`user/getUser/${user_id}`)
    }
}

export function subscribeCategory(category_id) {
    return {
        type: SUBSCRIBE_USER_TO_CATEGORY,
        payload: Axios.post(`user/subscribeCategory`, category_id)
    }
}

export function getUserCategories() {
    return {
        type: GET_USERS_SUBSCRIBED_CATEGORIES,
        payload: Axios.post(`user/getUserCategories`)
    }
}

export function firstLogin(user) {
    return{
        type: FIRST_LOGIN,
        payload: user
    }
}

export function checkUser() {
    return {
        type: CHECK_USER,
        payload: Axios.get(`auth/currentUser`)
    }
}