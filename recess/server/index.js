const express = require('express')
const app = express()
const session = require('express-session')
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
    app.listen(SERVER_PORT, () => {
        console.log(`Server is listening on port: ${SERVER_PORT}`)
    })
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
app.post('/auth/login')
app.get('/auth/logout')
app.get('/auth/currentUser')

app.put('/user/editUser/')
app.get('/user/getUser')


app.get('/api/messages')
app.get('/api/messages/:message_id')
app.post('/api/messages')
app.put('/api/messages/:message_id')
app.delete('/api/messages/:message_id')

app.get('/api/events')
app.get('/api/events/:event_id')
app.get('/api/subscribed_events/')
app.post('/api/events/subscribe')
app.delete('/api/events/unsubscribe/:event_id/')
app.post('/api/events')
app.put('/api/events/:event_id')
app.delete('/api/events/:event_id')

