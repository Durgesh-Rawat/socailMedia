require('dotenv').config();

const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.post('/signup', async (req,res) => {
    const {email,password} = req.body;
    const hashed = await bcrypt.hash(password,10);

    try{
        const newUser = await userModel.create({email,password:hashed});
        res.status(201).json({message: 'user created successfully'});
    } catch{
        res.status(400).json({message: 'Email already exists'});
    }
});

router.post('/login', async (req,res) => {
    const {email,password} = req.body;
    const existingUser = await userModel.findOne({email});

    if(!existingUser) return res.status(400).json({message:'Inavalid user'});
    
    const isMatch = await bcrypt.compare(password,existingUser.password);

    if(!isMatch) return res.status(400).json({message: 'Wrong Password'});

    const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    res.json({token});
});

module.exports = router;