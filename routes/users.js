var express = require('express');
var router = express.Router();
const user = require('../models').User


router.get('/api/users', async(req, res) => {
    const userProfile = await user.findAll();
    res.json(userProfile)
})

router.post('/api/users', (req, res) =>{
    
})

module.exports = router; 