
const Course = require('../modules/courses-module.js')

const {body,validationResult} = require('express-validator');

const asyncWrapper = require('../middleware/asyncWrapper.js');

const AppError = require('../help/AppError.js');

let getAllCourses = asyncWrapper(

    async(req,res)=>{
    let query = req.query;

    let page = query.page || 1;
    let limit = query.limit || 10;

    let skip = (page-1)*limit;

    const courses = await Course.find({}, { "__v":false } ).limit(limit).skip(skip);

    res.json( {status:"success", data:{ courses }} );
})

let getSingleCourse = asyncWrapper(

    async(req,res,next)=>{

    const course = await Course.find({_id: req.params.Id});

    console.log(course)

    if(!course)
    {

       const error = AppError.create("Course not found",404,"fail")

      return  next(error);
    }

   return res.json( {status:"success", data:{course}} );

});

let greatNewCourse =asyncWrapper(

    async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())                                                                                       
    {
        const error = AppError.create(errors.array(),400,"fail");

        return next(error);
    }                                                                                                                                                                                                  
   const NewCourse = new Course({
        title:req.body.title,
        price:req.body.price,
    })

    await NewCourse.save()
                                                                                                                            
    res.status(201).json({status:"success", data:{course:NewCourse}})
}) 

let updatecourse = asyncWrapper(

    async(req,res)=>{
 
    const updatedcourse =
    await Course.updateOne({_id:req.params.Id},{$set:{...req.body}});

    if(!updatedcourse)
    {
        return res.status(400).json({status:"fail", data:{course:null}});
    }
    return res.status(200).json({status:"success", data:{course:updatedcourse}});

})

let deleteCourse = asyncWrapper(
    
    async(req,res)=>{

    
     const result = await Course.deleteOne({_id:req.params.Id});

     if(!result.deletedCount){
        return res.status(400).json( {status:"fail", data:{course:null}} );
     }

     res.status(200).json({status:"success",data:null});

    
}) 

module.exports = {getAllCourses,getSingleCourse,greatNewCourse,updatecourse,deleteCourse}