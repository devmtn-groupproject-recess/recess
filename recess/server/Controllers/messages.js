module.exports = {
    getMessages: async (req, res) => {
        try{
            const db = req.app.get('db')
            const { event_id } = req.params

            const response = await db.get_messages(event_id)
            
            res.status(200).send(response)
        }catch(error) {
            console.log("There was an error in the Get Messages Block (messagesCtrl)", error)
            res.status(500).send(error)
        }
    },
    createMessage: async (req, res) => {

        try{
            if(!req.session.user) {
                res.status(409).send("No user logged in")
            }
            const db = req.app.get('db')
            const {event_id} = req.params
    
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            
            const {message_content} = req.body
    
            const {user_id} = req.session.user
    
            const newMessages = await db.add_message({user_id, message_content, event_id, message_date:dateTime})
    
            res.status(200).send(newMessages)

        }catch(error) {
            console.log("There was an error in the createMessage block (messagesCtrl)", error)
            res.status(500).send(error)
        }
    },
    editMessage: async (req, res) => {
        try{
            if(!req.session.user) {
                res.status(500).send("No user Logged in")
            }
            const db = req.app.get('db')
            const {event_id, message_id} = req.params

            const {message_content, message_date} = req.body

            const {user_id} = req.session.user

            const updatedMessages = await db.edit_message({message_id, event_id, message_date, message_content, user_id})

            res.status(200).send(updatedMessages)
        }catch(error) {
            console.log("There was an error in the edit Message block (messagesCtrl)", error)
            res.status(500).send(error)
        }
    },
    deleteMessage: async(req, res) => {
        try{
            if(!req.session.user) {
                res.status(404).send("No user logged in")
            }
            const db = req.app.get('db')
            const {message_id, event_id} = req.params

            const messages = await db.delete_message({message_id, event_id})

            res.status(200).send(messages)
        }catch(error) {
            console.log("There is an error in the deleteMessage block (messagesCtrl)", error)
            res.status(500).send(error)
        }
    }
} 