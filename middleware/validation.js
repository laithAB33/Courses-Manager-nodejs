const {body,validationResult} = require('express-validator');

const validationToPost= 

        [
            body('title')
                        .notEmpty().withMessage("title is require")
                        .isLength({min:2}).withMessage("title is short"),
   
            body('price')
                        .notEmpty().withMessage('price is empty')
   
       ]
    


module.exports = validationToPost;