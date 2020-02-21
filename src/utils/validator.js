const { body, validationResult, check } = require('express-validator')
const userValidationRules = () => {
  return [
    // username must be an email
    check('email').isEmail().withMessage('Email expected'),
    // password must be at least 5 chars long
    body('name').isLength({ min: 3 }),
  ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors);
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors,
    })
}

module.exports = {
    userValidationRules,
    validate,
}