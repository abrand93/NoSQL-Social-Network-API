const {Thoughts, User} = require("../models")

module.exports = {
    getUsers(req, res){
        User.find()
        .then(async(user)=> {
        const userObj ={
            user
         }
            return res.json(userObj)

        })
    },
    createUser(req, res){
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err)=> res.status(500).json(err))
    }




}