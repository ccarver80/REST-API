var express = require("express");
var router = express.Router();
const courses = require("../models").Course;
const { authUser } = require("../middleware/authenticate");

router.use(express.json());

//--------------GET ROUTES------------------//

router.get("/api/courses", async (req, res) => {
  try {
    const allCourses = await courses.findAll();
    res.json(allCourses);
  } catch (err) {
    res.json({
      message: "Something went wrong on the server",
    });
    console.log(err);
  }
});

router.get("/api/courses/:id", async (req, res) => {
  try {
    const singleCourse = await courses.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (singleCourse) {
      res.json(singleCourse);
    } else {
      res.status(404);
      res.json({
        message: "This course dose not exist yet!",
      });
    }
  } catch (err) {
    res.json({
      message: "Something went wrong on the server",
    });
    console.log(err);
  }
});

//-----------------POST ROUTES-----------------------//

router.post("/api/courses/", authUser, async (req, res) => {
  try {
   
      const newCourse = await courses.create(req.body);
      res.location("/api/course/" + newCourse.id);
      res.status(201);
    
    
  } catch (err) {
    res.json({
      message: err.errors.map(erry => erry.message)
    });
  }
});

//---------------------PUT ROUTE----------------------------//

router.put("/api/courses/:id", authUser, async (req, res) => {
  try {
    const findCourse = await courses.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (findCourse) {
      //----IF ITS A VALID COURSE--//
      const updateCourse = await findCourse.update(req.body);
      res.sendStatus(204);
    } else {
      res.json({
        message: "Could not find course",
      });
    }
  } catch (err) {
    res.json({
      message: "Something went wrong",
    });
    console.log(err);
  }
});

//-----------------DELETE ROUTE-------------------//

router.delete("/api/courses/:id", authUser, async (req, res) => {
  try {
    const findCourse = await courses.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (findCourse) {
      const deleteCourse = await findCourse.destroy();
      res.sendStatus(204);
    } else {
      res.json({
        message: "This course may not exisit",
      });
    }
  } catch (err) {
    res.json({
        message: "Something went wrong",
      });
      console.log(err);
  }
});

module.exports = router;
