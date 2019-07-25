import {combineReducers} from 'redux'

import users from './users'
import events from './events'
import messages from './messages'

export default combineReducers({
    users,
    events,
    messages
})