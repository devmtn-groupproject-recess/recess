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
                const db = req.app.get('db')
                const {event_id} = req.params
                const eventsList = await db.get_events(event_id)
        
                if(!req.session.user) {
                    res.status(404).send("No user is logged in!")
                }
        
                res.status(200).send(eventsList[0])
            }
        catch(error) {
            console.log('Error in events Ctrl (getEvent)', error)
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
    
            await db.subscribe_user_to_event({user_id, event_id})
    
            res.status(200).send("Success")
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
                event_description,
                event_location_lat,
                event_location_long
            } = req.body
            db.add_event({
                event_creator_id,
                event_name,
                event_type,
                event_date,
                event_description,
                event_location_lat,
                event_location_long
            })
            res.status(200).send("Event Created")
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
                event_location_long
            } = req.body
            const updatedEvent = await db.edit_event({
                event_creator_id,
                event_name,
                event_type,
                event_date,
                event_description,
                event_location_lat,
                event_location_long,
                event_id
            })
            res.status(200).send("Event Edited")
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
    }

}