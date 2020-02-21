const { pool } = require('./../DB');
const { send } = require('../utils/mailer');


const getEvents = async (request, response) => { 
    const events = await pool.query('SELECT * FROM events');
    response.status(200).json({ events: events.rows })
}

const createEvent = async (request, response) => {
    const { title, event_date } = request.body;
    try {
        const created = await pool.query('INSERT INTO events (title, event_date, event_venue) VALUES ($1, $2)', [title, event_date, event_venue]);
        response.json({
            message: 'Event Created',
            body: {
                event: {title, event_date, event_venue}
            }
        })
    } catch (error) {
        return response.status(500).json({ error: error.toString() });
    }
    
}

const register = async (request, response) => {
    const { title, name, email, phone, event_date } = request.body;
    try {
        const created = await pool.query('INSERT INTO events (title, name, email, phone, event_date) VALUES ($1, $2)', [title, name, email, phone, event_date]).catch(e => console.log('Error: ', e.message));
        const email = await send(email, 'Training Confirmation', `Congratulations ${name}, your training has been confirmed!`);
        
        
        send(process.env.ADMIN_MAIL, 'New Registration', `${name} has just registered to attend ${title}. 
        Phone Number: ${phone}
        Email: ${email}`)
        response.status(200).json(
            {
                message: 'Registration Successfull'
            }
        )
    } catch (error) {
        response.status(500).json({ error: error.toString() });
    }
    
}




module.exports = {
    getEvents,
    createEvent,
    register
}