var express = require("express");
var router = express.Router();
const courses = require("../models").Course

router.use(express.json());

//--------------GET ROUTES------------------//

router.get('/api/courses', async(req, res) => {
    try {
        const allCourses = await courses.findAll(); 
        res.json(allCourses)
    }catch(err) { 
        res.json({
            message: "Something went wrong on the server"
        })
        console.log(err)
    }
})

router.get('/api/courses/:id', async(req, res) => {
    try {
        const singleCourse = await courses.findOne({
            where: {
                id: req.params.id
            }
        })
        if(singleCourse) {
            res.json(singleCourse);
        }else {
            res.status(404)
            res.json({
                message: "This course dose not exist yet!"
            })
        
        }
    }catch(err) {
        res.json({
            message: "Something went wrong on the server"
        })
        console.log(err)
    }
})

//-----------------GET POST ROUTES-----------------------//

router.post('/api/courses/', async(req, res) => {
    try {
        const checkCourseExists = await courses.findOne({
            where: {
                title: req.body.title
            }
        })

        if(!checkCourseExists){
        const newCourse = await courses.create(req.body)
            res.location('/api/course/' + newCourse.id)
            res.sendStatus(201)
        }else{
            res.json({
                message: "This course may already exist"
            })
        }

    }catch(err) {
        res.json({
            message: "Something went wrong"
        })
    }
})


module.exports = router;