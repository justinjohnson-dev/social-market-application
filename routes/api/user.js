const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/config");
// Load input validation
const validateSignUpInput = require("../../validation/signup")
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/user");

router.post("/signup", (req, res) => {
    // Form validation
    const { errors, isValid } = validateSignUpInput(req.body);
    const { name, email, password } = req.body;

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email Already Exists" });
        } else {
            const newUser = new User({
                name,
                email,
                password
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/signin", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 3600 // 1 hour
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password Incorrect" });
            }
        });
    });
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: "Error" })
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const farmer = await User.findById(req.params.userId);
        res.json(farmer);
    } catch (err) {
        res.json({ message: "No user found" });
    }
});


module.exports = router;