const router = require('express').Router();
const {
    createThought,
    getThoughts,
    deleteSingleThought,
    getSingalThought,
    createReaction,
    deleteReaction

} = require('../../controllers/thougtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought)

// /api/courses/:courseId
// router
  router.route('/:thoughtId')
  .get(getSingalThought)
//   .put(createReaction)
  .delete(deleteSingleThought);

  router.route("/:thoughtId/reactions")
  .post(createReaction)

  router.route("/:thoughtId/reactions/:reactionId")
  .delete(deleteReaction)
module.exports = router;
