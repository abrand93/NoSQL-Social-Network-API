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

    getSingalThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .then(async (thought) =>
            !thought
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json({
                  thought,
                  })
          )
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },

      createReaction(req,res){
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        
        )
        .then(async (reactions) =>
            !reactions
              ? res.status(404).json({ message: 'No reaction with that ID' })
              : res.json({
                  reactions,
                  })
          )
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });

      },

      
      deleteReaction(req, res){
        Thoughts.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            { runValidators: true, new: true },
        
        )
        .select('-__v')
        .then(async (reaction) =>
          !reaction
            ? res.status(404).json({ message: 'No Thoughts with that ID' })
            : res.json({
                reaction,
                })
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        })
      },
  createThought({body}, res) {
        Thoughts.create(body)
          .then(({_id}) => {
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $push:  { thoughts: _id } },
              { runValidators: true, new: true }
            );
          })
          .then((thoughts) =>
          !thoughts
            ? res
                .status(404)
                .json({ message: 'no thought found' })
            : res.json(thoughts)
        )
          .catch((err) => res.json(err));
      },
  updateSingleThought(req,res){

  },
      
deleteSingleThought(req, res) {
    Thoughts.findOneAndRemove({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
              thought,
              })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    }


}