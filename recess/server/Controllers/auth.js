const bcrypt = require('bcryptjs')

module.exports = {
    checkUser: async(req, res, next) => {
        try {
            const db = req.app.get('db')
            const {username} = req.body.userInfo

            let users = await db.get_user_by_username(username)
            let user = users[0]

            if(user) {
                return res.status(409).send("Username already in use")
            }
            next()
        }catch(error){
            console.log('There was an error in checkUser (authCtrl)', error)
            res.status(500).send(error)
        }
    },
    register: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {
                user_first_name,
                user_last_name, 
                user_address,
                user_city,
                user_state,
                user_zip,
                user_phone,
                username,
                password
            } = req.body.userInfo

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            let response = await db.add_user({
                user_first_name,
                user_last_name,
                user_address,
                user_city,
                user_state,
                user_zip,
                user_phone,
                username,
                password: hash
            })

            let newUser = response[0]

            delete newUser.password

            req.session.user = newUser

            res.send(req.session.user)
        }catch(error){
            console.log('There was an error in the register block (authCtrl)', error)
            res.status(500).send(error)
        }
    }
}