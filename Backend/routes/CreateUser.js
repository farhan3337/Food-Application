const express = require('express');
const user = require('../models/user');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWTSECRETKEY} = require('../config/index')

router.post('/createuser',[
body('email').isEmail(),
body('name').isLength({ min: 5 }),
body('password','password must be 5 digits').isLength({ min: 5 })],
async (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10)
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
        await user.create({
            name: req.body.name,
            password: secPassword,
            location: req.body.location,
            email: req.body.email
        });
        res.json({success: true});

    } catch (error) {
        console.log(error);
        res.json({success: false});
    }

});

// Login User Route

router.post('/loginuser',[
body('email').isEmail(),
body('password','password must be 5 digits').isLength({ min: 5 })],
async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email= req.body.email;
    try {
        let userData =  await user.findOne({email});
        const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
        if(!userData || !pwdCompare){
            return res.status(400).json({ errors: "Enter Valid Credentials" });
        }
        const data = {
            user: {
                id: userData.id
            }
        }

        const authToken = jwt.sign(data, JWTSECRETKEY);
        res.json({success: true, authToken: authToken});

    } catch (error) {
        console.log(error);
        res.json({success: false});
    }

});

module.exports = router;