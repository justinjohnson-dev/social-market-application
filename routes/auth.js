const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// route for registering users
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // send user error if they miss a field
    if(!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    } 

    // check for existing user
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'user does not exist' });

            // validate the users password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

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

// GET user data
// PRIVATE Route
router.get('/user', auth, (req, res) => {
    console.log('inside this call');
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;
