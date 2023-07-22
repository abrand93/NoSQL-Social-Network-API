const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const thougtRoutes = require('./thoughtRoutes')
// const thoughtRoutes = require('./thougtRoutes');

router.use('/users', usersRoutes);

router.use('/thoughts', thougtRoutes);

module.exports = router;
