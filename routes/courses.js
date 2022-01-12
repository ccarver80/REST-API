var express = require("express");
var router = express.Router();
const courses = require("../models").Course;

router.get("/api/courses", async (req, res) => {
  const allCourses = await courses.findAll();
  res.json(allCourses);
});

router.get("/api/courses/:id", async (req, res) => {
  const courseId = await courses.findAll({
    where: {
      id: req.params.id,
    },
  });

  res.json(courseId);
});

router.post("/api/courses", async (req, res) => {});

module.exports = router;
