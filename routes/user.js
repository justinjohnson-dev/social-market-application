const express = require("express");
const router = express.Router();
const Name = require('../models/user');

// routes
router.post('/name', name);

module.exports = router;

function name(req, res, next) {
    Name.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}