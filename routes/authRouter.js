const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require("../models/User.js")
const authController = require("../controllers/authController")


// Regester Route : 
router.post('/regester', authController.regester)


// Login route : 

router.post('/login', authController.login)


module.exports = router
