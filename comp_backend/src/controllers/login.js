const express = require('express');
const userService = require('../services/user');
const router = express.Router();

router.post('/login', (req, res) =>{
    userService.authenticateUser(req.body).then((user)=>{
        res.status(200).json(user);
    }).catch((err)=>{
        res.status(400).json(err);
    })      
})
router.post('/login/otp', (req, res) =>{
    userService.verifyOtp(req.body).then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(400).json(err);
    })
})
module.exports = router; 

