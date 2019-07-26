const express = require('express')
const app = express()
const session = require('express-session')
const socket = require('socket.io');
require('dotenv').config()
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

const authCtrl = require('./Controllers/auth')
const eventsCtrl = require('./Controllers/events')
const messagesCtrl = require('./Controllers/messages')
const usersCtrl = require('./Controllers/users')

app.use(express.static(`${__dirname}/../build`))

app.use(express.json())

massive(CONNECTION_STRING).then( db => {
    app.set('db', db)
    console.log('The DB is connected')
    const io = socket(app.listen(SERVER_PORT, () => {
        console.log(`Server is listening on port: ${SERVER_PORT}`)
    }))

    

})

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized:  false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}))

app.post('/auth/register', authCtrl.checkUser, authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/auth/currentUser', authCtrl.currentUser)

app.put('/user/editUser/', usersCtrl.editUser)
app.get('/user/getUser/:user_id', usersCtrl.getUser)
app.post('/user/subscribeCategory',usersCtrl.checkSubscribedCategory, usersCtrl.subscribeToCategory)
app.get('/user/getUserCategories', usersCtrl.getSubscribedCategories)


app.get('/api/messages/:event_id', messagesCtrl.getMessages)
app.post('/api/messages/:event_id', messagesCtrl.createMessage)
app.put('/api/messages/:event_id/:message_id', messagesCtrl.editMessage)
app.delete('/api/messages/:event_id/:message_id', messagesCtrl.deleteMessage)

app.get('/api/events', eventsCtrl.getEvents)
app.get('/api/events/:event_id', eventsCtrl.getEvent)
app.get('/api/subscribed_events/', eventsCtrl.getSubscribedEvents)
app.post('/api/events/subscribe/:event_id', eventsCtrl.checkSubscribedEvents, eventsCtrl.subscribeToEvent)
app.delete('/api/events/unsubscribe/:event_id/', eventsCtrl.unsubscribeToEvent)
app.post('/api/events', eventsCtrl.addEvent)
app.put('/api/events/:event_id', eventsCtrl.editEvent)
app.delete('/api/events/:event_id', eventsCtrl.deleteEvent)
// app.get('/api/events/checkSubscribed/:event_id', eventsCtrl.checkSubscribedEvents)
