const { Router } = require('express');
const eventRouter = Router();

const { getEvents, createEvent, register } = require('../controllers/index')
eventRouter.route('/').post(createEvent).get(getEvents);
eventRouter.post('/register', register)

module.exports = eventRouter;