const bcrypt = require('bcryptjs')

module.exports = {
    checkUser: async(req, res, next) => {
        try {
            const db = req.app.get('db')
            const {username} = req.body

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
        console.log(2322323,req.body)
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
                password,
                user_img
            } = req.body

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
                password: hash,
                user_img
            })

            let newUser = response[0]

            delete newUser.password

            req.session.user = newUser

            res.send(req.session.user)
        }catch(error){
            console.log('There was an error in the register block (authCtrl)', error)
            res.status(500).send(error)
        }
    }, 
    login: async (req, res) => {
        try{
            const db = req.app.get('db')
            console.log(req.body)
            let {username, password} = req.body

            let users = await db.get_user_by_username(username)
            let user = users[0]

            console.log('hit1')

            if(!user) {
                return res.status(401).send("Username or Password is incorrect")
            }
            console.log('hit2')

            let isAuthenticated = bcrypt.compareSync(password, user.password)

            if(!isAuthenticated) {
                return res.status(401).send("Username or Password is incorrect")
            }

            console.log('hit3')


            delete user.password
            req.session.user = user
            res.send(req.session.user)

        }catch(error) {
            console.log("There was an error in the login block (authCtrl)", error)
            res.status(409).send(error)
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.status(200).send("Logged Out")
    },
    currentUser: (req,res) => {
        if (req.session.user) {
            res.send(req.session.user)
        }else{
            res.status(404).send("No User is logged in")
        }
    }
}