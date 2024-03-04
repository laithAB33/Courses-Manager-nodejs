
const express = require('express');

const router = express.Router();

const {body,validationResult} = require('express-validator');

const controller = require("../controller-actions/courses-actions.js");

const validationToPost = require('../middleware/validation.js');

const verifyToken = require('../middleware/verify-token')

const allowTo = require('../middleware/allowTo.js');

const userRoles = require('../help/usersRoles');

router.route('/')
    .get(controller.getAllCourses)
    .post(verifyToken,allowTo(userRoles.MANAGER),validationToPost ,controller.greatNewCourse)
  
  
  router.route('/:Id')
        .get(controller.getSingleCourse)
        .patch(controller.updatecourse)
        .delete(verifyToken,allowTo(userRoles.ADMIN,userRoles.MANAGER),controller.deleteCourse)                                                                                                            
 

module.exports = router;