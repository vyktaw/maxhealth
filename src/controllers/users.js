const { pool } = require('./../DB')
const { send } = require('../utils/mailer');
const fs = require('fs');


const getUsers = async (request, response) => {
    try {
        const users = await pool.query('SELECT * FROM users');
        response.status(200).json({ users: users.rows })
    } catch (error) {
        return response.status(500).json({ error: 'could not load users' });
    }
}

const createUser = async (request, response) => {
    const { name, email, phone } = request.body;

    const template = fs.readFileSync(__dirname + '/email-inlined.html',{encoding:'utf-8'});

    try {
        const created = await pool.query('INSERT INTO users (username, email, phone) VALUES ($1, $2, $3)', [name, email, phone]);        
        
        await send(email, 'Registration Successful', template);
        send(process.env.ADMIN_MAIL, 'New Registration', `${name} has just registered on your site. 
        Phone Number: ${phone} 
        Email: ${email}`)
        response.json({
            message: 'Registration Completed',
            body: {
                user: {name, email, phone}
            }
        })
    } catch (error) {
        return response.status(500).json({ error: 'could not create user' });
    }
    
}


/* app.post('/join', (request, response) => {
    const { name, email, phone } = request.body;
    sendEmail(email, name, 'Registration Successful', `Congratulations ${name}, you will be contacted shortly!`);
    response.json({ info: 'Registration Successful' })
}); */

module.exports = {
    getUsers,
    createUser
}