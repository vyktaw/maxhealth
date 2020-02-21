const { Router } = require('express');
const { userValidationRules, validate } = require('../utils/validator')
const userRouter = Router();

const { getUsers, createUser } = require('../controllers/index')

/**
* @swagger
* /api/v0/companies:
*   post:
*     tags:
*     - company
*     description: ''
*     summary: Add a new company
*     produces:
*       - application/json
*     parameters:
*       - in: body
*         name: body
*         description: Company object that needs to be added to the system. ID will be replaced by system.
*         required: true
*         schema:
*           $ref: '#/definitions/Company'
*     security:
*       - Bearer: []
*       - api_key: []
*     responses:
*       200:
*         description: Company created
*       401:
*         description: Unauthorized. Need JWT.
*       409:
*         description: Invalid payload
*/
userRouter.route('/').post(userValidationRules(), validate, createUser).get(getUsers);

module.exports = userRouter;