const { pool } = require('./../DB')
const { getUsers, createUser } = require('./users')
const { getEvents, createEvent, register } = require('./events')
const { getOrders, createOrder } = require('./orders')

const home = (request, response) => {
    response.json({ info: 'Welcome to Maxified' })
}



/* const getBooks = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
} */

module.exports = {
    home,
    getUsers,
    createUser,
    getEvents,
    createEvent,
    getOrders,
    createOrder,
    register
}