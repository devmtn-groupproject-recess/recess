const express = require('express')
const app = express()
const session = require('express-session')
const socket = require('socket.io');
require('dotenv').config()
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, AWS_ACCESS_KEY_PRIVATE, AWS_ACCESS_KEY_PUBLIC, AWS_REGION, S3_BUCKET } = process.env
const AWS = require('aws-sdk')


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

    // io.on('connection', socket => {
    //     socket.emit('chat-message', 'hello, world')

        
    // })

    
})

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_PUBLIC,
    secretAccessKey: AWS_ACCESS_KEY_PRIVATE,
    region: AWS_REGION
})

const S3 = new AWS.S3()

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized:  false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}))

app.post('/api/s3', (req, res) => {
    const photo = req.body

    const buf = new Buffer(photo.file.replace(/^data:image\/\w+;base64,/, ''), 'base64')

    const params = {
        Bucket: S3_BUCKET,
        Body: buf,
        Key: photo.fileName,
        ContentType: photo.fileType,
        ACL: 'public-read'
    }

    S3.upload(params, (err, data) => {
        console.log(222222, err)
        let response, code;
        if(err) {
            response = err;
            code = 500
        }else {
            response = data;
            code = 200
        }
        res.status(code).send(response)
    })
})

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
app.get('/api/subscribed_events', eventsCtrl.getSubscribedEvents)
app.post('/api/events/subscribe/:event_id', eventsCtrl.checkSubscribedEvents, eventsCtrl.subscribeToEvent)
app.delete('/api/events/unsubscribe/:event_id', eventsCtrl.unsubscribeToEvent)
app.post('/api/events', eventsCtrl.addEvent)
app.put('/api/events/:event_id', eventsCtrl.editEvent)
app.delete('/api/events/:event_id', eventsCtrl.deleteEvent)
app.get('/api/check_user_subscribed_events/:event_id', eventsCtrl.checkUserSubscribedEvents)

