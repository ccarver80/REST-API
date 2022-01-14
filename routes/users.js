var express = require("express");
var router = express.Router();
const users = require("../models").User;
const auth = require("basic-auth");
const bcrypt = require("bcryptjs");

router.use(express.json()); 

router.get("/api/users", async (req, res) => {
  const creds = auth(req);
  try {
    const user = await users.findOne({
      where: {
        emailAddress: creds.name,
      },
    });

    if (user) {
      const authenticate = bcrypt.compareSync(creds.pass, user.password);
      if (authenticate) {
        res.json(user);
      } else {
        res.json({
          message: "Passwords do not match",
        });
      }
    } else {
      res.json({
        message: "This user may not exist",
      });
    }
  } catch (err) {
    res.json({
        message: "Something went wrong with the server:", 
    })
  }
});


//----------------USER POST ROUTE -------------------//

router.post('/api/users', async(req, res) => {
    const newUser = await users.create(req.body)
    res.location("/")
    res.sendStatus(201); 
})

module.exports = router;
