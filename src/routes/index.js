const { Router } = require('express');
const router = Router();
const usersRouter = require('./users');
const eventsRouter = require('./events');
const ordersRouter = require('./orders');

const { home } = require('../controllers/index')


router.get('/', home);
router.use('/users', usersRouter);
router.use('/events', eventsRouter);
router.use('/orders', ordersRouter);

module.exports = router;