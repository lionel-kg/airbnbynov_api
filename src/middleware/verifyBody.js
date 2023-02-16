const { body, validationResult } = require('express-validator');


exports.checkBody = [
    body('email').isEmail().withMessage('email not valid'),
    body('password').isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    }).withMessage('password not valid')
],

exports.checkBodyUpdate = [
    body('email').isEmail().withMessage('email not valid'),
],

exports.checkIdentity = [
    body("firstName").isAlphanumeric().isLength({
        min: 2,
        max: 50
    }).notEmpty().withMessage("firstName wrong format"),
    
    body("lastName").isAlphanumeric().isLength({
        min: 2,
        max: 50
    }).notEmpty().withMessage("lastName wrong format"),
]

exports.validation = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

