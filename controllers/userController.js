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
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .then(async (user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json({
                  user,
                  })
          )
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },

      updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },

deleteSingleUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
          .select('-__v')
          .then(async (user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json({
                  user,
                  })
          )
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
      addFriend(req, res) {
        // console.log();
        // console.log(req.body);
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
        },
        deleteSingleFriend(req, res) {
          User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
           )
            .select('-__v')
            .then(async (user) =>
              !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json({
                    user,
                    })
            )
            .catch((err) => {
              console.log(err);
              return res.status(500).json(err);
            });
}
}