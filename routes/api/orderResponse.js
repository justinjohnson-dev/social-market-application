const express = require("express");
const router = express.Router();
const formidable = require('formidable');
// Load input validation
const validateOrderResponseInput = require("../../validation/orderResponse")
// Load User model
const OrderResponse = require("../../models/orderResponse");

router.post("/farmerresponse", (req, res) => {
    // using the formidable package to handle
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields) => {
        // Form validation
        const { errors, isValid } = validateOrderResponseInput(fields);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        // Check to make sure all fields are filled out
        const { items, quantity, userId, farmerId, comment, status } = fields
        if (!items || !quantity || !userId || !farmerId || !comment || !status) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let order = new OrderResponse(fields)

        // Save the new post
        order.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(success);
        });
    });
});


module.exports = router;