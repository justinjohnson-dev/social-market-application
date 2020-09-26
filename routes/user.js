const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const config = require('config');
const jwt = require('jsonwebtoken');

// route for registering users
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    // send user error if they miss a field
    if(!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    } 

    // check for existing user
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: 'user already exists' });

            // new user object
            const newUser = new User({
                name,
                email,
                password
            });

            // generate a salt for a hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    // save user to collection and display id,name,email
                    newUser.save()
                        .then(user=> {

                            // create token - user id will be in token
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                // token will only last one hour
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                            );
                        });
                });
            });
        });
});

module.exports = router;
