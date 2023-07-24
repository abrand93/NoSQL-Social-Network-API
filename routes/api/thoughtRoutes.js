const router = require('express').Router();
const {
    createThought,
    getThoughts,
    deleteSingleThought,
    getSingalThought,
    createReaction,
    deleteReaction,
    updateSingleThought

} = require('../../controllers/thougtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought)

// /api/thoughts/:thoughtId
// router
  router.route('/:thoughtId')
  .get(getSingalThought)
  .put(updateSingleThought)
  .delete(deleteSingleThought);

  router.route("/:thoughtId/reactions")
  .post(createReaction)

  router.route("/:thoughtId/reactions/:reactionId")
  .delete(deleteReaction)
module.exports = router;
