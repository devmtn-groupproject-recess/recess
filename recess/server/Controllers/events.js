module.exports = {
    getEvents: async (req, res) => {
    try {
            const db = req.app.get('db')
            const eventsList = await db.get_events()
            if(!req.session.user) {
                res.status(404).send("No user is logged in!")
            }
    
            res.status(200).send(eventsList)
        }catch(error) {
            console.log('Error in events Ctrl (getEvents)', error)
            res.status(409).send(error)
        }
    },
    getEvent: async (req, res) => {
        try {
                if(!req.session.user) {
                    res.status(404).send("No user is logged in!")
                }

                const db = req.app.get('db')
                const {event_id} = req.params
                
                const eventsList = await db.get_event(event_id)
        
                res.status(200).send(eventsList[0])
            }
        catch(error) {
            console.log('Error in events Ctrl (getEvent)', error)
            res.status(409).send(error)
        }
    },
    getUserCreatedEvents: async (req, res) => {
        try {
                if(!req.session.user) {
                    res.status(404).send("No user is logged in!")
                }

                const db = req.app.get('db')
                const {user_id} = req.session.user
                
                const userCreatedEventsList = await db.get_user_created_events(user_id)

                console.log(898989, userCreatedEventsList)
        
                res.status(200).send(userCreatedEventsList)
            }
        catch(error) {
            console.log('Error in events Ctrl (getUserCreatedEvents)', error)
            res.status(409).send(error)
        }
    },
    getSubscribedEvents: async (req, res) => {
        try{
            const db = req.app.get('db')
            if(!req.session.user) {
                res.status(404).send("No user is logged in!")
            }
            const {user_id} = req.session.user

            const response = await db.get_users_subscribed_events({user_id})
            const subEvents = response.map( event => {
                delete event.password
                return event
            })

            res.status(200).send(subEvents)
        }catch(error) {
            console.log('Error in events Ctrl (getSubscribedEvents)', error)
            res.status(409).send(error)
        }
    },
    subscribeToEvent: async (req, res) => {
        try{
            const db = req.app.get('db')
            if(!req.session.user) {
                res.status(404).send("No user is logged in!")
            }
            const {user_id} = req.session.user
            const {event_id} = req.params 
    
            let events = await db.subscribe_user_to_event({user_id, event_id})
    
            res.status(200).send(events)
        }catch(error) {
            console.log('Error in events Ctrl (subscribeToEvent)', error)
            res.status(409).send(error)
        }
    },
    unsubscribeToEvent: async (req, res) => {
        try {
            const db = req.app.get('db')
            if(!req.session.user) {
                res.status(404).send("No user is logged in!")
            }    
            const {user_id} = req.session.user
            const {event_id} = req.params 
    
            const subEvents = await db.unsubscribe_to_event({user_id, event_id})
    
            res.status(200).send(subEvents)        
        }catch(error) {
            console.log('Error in events Ctrl (unsubscribeToEvent)', error)
            res.status(409).send(error)
        }
    },
    addEvent: async (req, res) => {
        try{
            const db = req.app.get('db')
            const {user_id:event_creator_id} = req.session.user
            const {
                event_name, 
                event_type,
                event_date,
                event_time,
                event_description,
                event_location_lat,
                event_location_long,
                event_city,
                event_state,
            } = req.body
            console.log(req.body)
            const dateTime = `${event_date} ${event_time}:00`
            const eventList = await db.add_event({
                event_creator_id,
                event_name,
                event_type,
                event_date: dateTime,
                event_description,
                event_location_lat,
                event_location_long,
                event_city,
                event_state
            })

            console.log("Event:" ,eventList)

            const event_id =(eventList[0].event_id)
            console.log(event_id)

            const newEventList = await db.subscribe_user_to_event({event_id, user_id: event_creator_id})

            res.status(200).send(newEventList)
        }catch(error) {
            console.log('Error in events Ctrl (addEvent)', error)
            res.status(409).send(error)
        }
    },
    editEvent: async (req, res) => {
        try{
            const db = req.app.get('db')
            const {user_id:event_creator_id} = req.session.user
            const {event_id} = req.params
            const {
                event_name, 
                event_type,
                event_date,
                event_description,
                event_location_lat,
                event_location_long,
                event_state,
                event_city
            } = req.body
            console.log(req.body, event_id, event_creator_id)
            const updatedEvent = await db.edit_event({
                event_creator_id,
                event_name,
                event_type,
                event_date,
                event_description,
                event_location_lat,
                event_location_long,
                event_id,
                event_state,
                event_city
            })
            res.status(200).send(updatedEvent)
        }catch(error) {
            console.log('Error in events Ctrl (editEvent)', error)
            res.status(409).send(error)
        }

    },
    deleteEvent: async (req, res) => {
        try{
            const db = req.app.get('db')
            const {event_id} = req.params
            
            const events = await db.delete_event(event_id)
            res.status(200).send(events)
        }catch(error) {
            console.log('Error in events Ctrl (deleteEvent)', error)
            res.status(409).send(error)
        }
    }, 
    checkSubscribedEvents: async (req, res, next) => {
        try {
            const db = req.app.get('db')
            const {user_id} = req.session.user
            const {event_id} = req.params
            const response = await db.check_event({user_id, event_id})
            if(response[0]){
                res.status(409).send("Already Subscribed")
            }
            next()
        }catch(error){
            console.log("There was an error in the checkSubscribedEvents block (eventsCtrl)", error)
            res.status(409).send(error)
        }
    },
    checkUserSubscribedEvents: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {user_id} = req.session.user
            const {event_id} = req.params
            const response = await db.check_event({user_id, event_id})
            if(response[0]){
                res.status(200).send(true)
            }
            else{
                res.status(200).send(false)
            }
            
        }catch(error){
            console.log("There was an error in the checkUserSubscribedEvents block (eventsCtrl)", error)
            res.status(409).send(error)
        }
    }

}