module.exports = {
    getUser: async (req, res) => {
        const db = req.app.get('db')
        const {user_id: desired_user_id} = req.params
        const {user_id: current_user_id} = req.session.user


        if (Number(desired_user_id) === Number(current_user_id)) {
            const users = await db.get_user(current_user_id)
            const user = users[0]

            delete user.password

            res.status(200).send(user)
        }else{
            const users = await db.get_other_user(desired_user_id)
            const user = users[0]

            res.status(200).send(user)
        }
    },
    editUser: async (req, res) => {
        try{
            if(req.session.user) {
                const db = req.app.get('db')
                const {user_id} = req.session.user
                const {
                    user_first_name,
                    user_last_name, 
                    user_address,
                    user_city,
                    user_state,
                    user_zip,
                    user_phone
                } = req.body.userInfo

                let response = await db.edit_user({
                    user_id,
                    user_first_name,
                    user_last_name,
                    user_address,
                    user_city,
                    user_state,
                    user_zip,
                    user_phone,
                })

                let user = response[0]

                delete user.password

                res.status(200).send(user)
            }else {
                res.status(409).send("No user logged in")
            }
        }catch(error) {
            console.log('There was an error in the edit User block (usersCtrl)',error)
            res.status(409).send(error)
        }
    },
    subscribeToCategory: async (req, res) => {
        try{
            const db = req.app.get('db')
            if(!req.session.user){
                res.status(409).send("User not logged in")
            }
            const {user_id} = req.session.user
            const {category_id} = req.body
    
            await db.subscribe_user_to_category({user_id, category_id})
    
            res.status(200).send("Category Added")
        }catch(error) {
            console.log("There was an error in the subscribeToCategory (usersCtrl)", error)
            res.status(409).send(error)
        }
    },
    getSubscribedCategories: async (req, res) => {
        try{
            const db = req.app.get('db')
            const {user_id} = req.session.user
            const response = await db.get_user_subscribed_categories(user_id)
            const categories = response.map(category => {
                delete category.password
                return category
            })
            res.status(200).send(categories)
        }catch(error){
            console.log("There was an error in the getsubscribedCategories block (usersCtrl)", error)
            res.status(409).send(error)
        }
    },
    checkSubscribedCategory: async (req, res, next) => {
        try{
            const db = req.app.get('db')
            const {user_id} = req.session.user
            const {category_id} = req.body
            let response = await db.check_category({user_id, category_id})
            let isSubcribed = response[0]
            if(isSubcribed){
                res.status(409).send("Already Subscribed")
            }
            next()
        }catch(error){
            console.log("There was an error in the checkSubscribedCategories block (usersCtrl)", error)
            res.status(409).send(error)
        }
    }
}