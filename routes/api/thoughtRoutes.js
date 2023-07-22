const router = require('express').Router();
const {
    createThought,
    getThoughts
} = require('../../controllers/thougtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought)

// /api/courses/:courseId
// router
//   .route('/:courseId')
//   .get(getSingleCourse)
//   .put(updateCourse)
//   .delete(deleteCourse);

module.exports = router;
