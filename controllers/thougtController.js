const {Thoughts, User} = require("../models")

module.exports = {
    getThoughts(req, res){
        Thoughts.find()
        .then(async(thought)=> {
        const userObj ={
            thought
         }
            return res.json(userObj)

        })
    },

    createThought({ params, body }, res) {
        Thoughts.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { thoughts: _id } },
              { runValidators: true, new: true }
            );
          })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res
                .status(404)
                .json({ message: "Thought created but no user with this id!" });
            }
    
            res.json({ message: "Thought successfully created!" });
          })
          .catch((err) => res.json(err));
      },
    
      
deleteSingleThought(req, res) {
    Thoughts.findOneAndRemove({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No thought with that ID' })
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