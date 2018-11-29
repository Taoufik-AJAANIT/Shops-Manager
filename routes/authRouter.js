const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require("../models/User.js")


// Regester Route : 
router.post('/regester', (req, res) => {

    // back-end Validation
    req.check('email', "*Please enter valid email-ID. !!").isEmail()
    req.check('password', "*Please enter valid email-ID. !!").notEmpty()
    req.check('password', 'passwords does not match !').equals(req.body.password2)

    var errors = req.validationErrors()
    if (errors)
        return res.status(500).json({
            messege: errors
        });

    // after Validation
    User.find({ email: req.body.email })
        .exec()
        .then(result => {

            if (result.length) {
                return res.status(500).json({
                    messege: 'email already exists !',
                });
            }

            bcrypt.hash(req.body.password, 15, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        messege: 'hash error !'
                    })
                }


                let user = new User({
                    email: req.body.email,
                    password: hash,
                })
                // Saving to mongo
                user
                    .save()
                    .then(() => {
                        res.status(201).json({
                            messege: 'account created succefully , Please Login !',
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            messege: 'Error while creating account !'
                        })
                    });
            });
        });




})


// Login route : 

router.post('/login', (req, res) => {
    // back-end Validation
    req.check('email', "*Please enter valid email-ID. !!").isEmail()
    req.check('password', "*Please enter your Password.").notEmpty()

    var errors = req.validationErrors()
    if (errors)
        return res.status(500).json({
            messege: errors
        });

    // after Validation

    User.find({
        email: req.body.email
    })
        .exec()
        .then(results => {

            if (!results.length) {
                return res.status(500).json({
                    messege: 'Authontiction failled !'
                });
            }

            bcrypt.compare(req.body.password, results[0].password, (err, result) => {

                if (err) {
                    return res.status(500).json({
                        messege: 'Authontiction failled !'
                    });
                }
                if (result) {
                    const token = jwt.sign({

                        userId: results[0]._id

                    }, process.env.jwt_KEY, {
                            expiresIn: '12h'
                        })
                    let jwToken = `Bearer ${token}`;
                    return res.status(200).json({
                        messege: 'Authontication succeed ! ',
                        token: jwToken
                    });
                }
                return res.status(500).json({
                    messege: 'Authontiction failled !'
                });
            })
        });


})


module.exports = router
