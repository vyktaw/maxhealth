const { pool } = require('./../DB')
const { send } = require('../utils/mailer');


const getOrders = async (request, response) => {
    try {
        const orders = await pool.query('SELECT * FROM orders');
        response.status(200).json({ orders: orders.rows })
    } catch (error) {
        return response.status(500).json({
            status: 'error',
            message: 'Could not retrieve orders',
          })
    } 
}

const createOrder = async (request, response) => {
    const { product_name, name, email, phone } = request.body;
    try {
        if (!name || !phone) {
            return response.status(400).json({
              status: 'error',
              message: 'Missing required email and name fields',
            })
        }
        const created = await pool.query('INSERT INTO orders (product_name, name, email, phone, order_date) VALUES ($1, $2, $3, $4, $5)', [product_name, name, email, phone, new Date()]);
        await send(email, 'Order Confirmed', `<h3>This is to confirm your order for ${product_name},</h3>  <p>The order you placed on TMaxified, you will be contacted with the details you provided.</p>`);
        send(process.env.ADMIN_MAIL, 'New Order', `${name} has just order ${product_name}. 
        Phone Number: ${phone}
        Email: ${email}`)
        response.json({
            message: 'Event Created',
            body: {
                order: {product_name, name}
            }
        })
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            status: 'error',
            message: 'Something went wrong',
          })
    }
    
}


/* app.post('/order', async (request, response) => {
    console.log('trying.....')
    try {
        const { name, email, phone } = request.body;
        if (!name || !email) {
            return response.status(400).json({
              status: 'error',
              message: 'Missing required email and name fields',
            })
        }
        await send(email, name, 'Order Confirmed', `This is to confirm, the order you placed on TMaxified, you will be contacted with the details you provided.`);
        response.json({ info: 'Order Completed' })
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            status: 'error',
            message: 'Something went wrong',
          })
    }
    
}); */

module.exports = {
    getOrders,
    createOrder
}