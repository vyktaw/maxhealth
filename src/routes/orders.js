const { Router } = require('express');
const orderRouter = Router();

const { getOrders, createOrder } = require('../controllers/index')
orderRouter.route('/').post(createOrder).get(getOrders);

module.exports = orderRouter;