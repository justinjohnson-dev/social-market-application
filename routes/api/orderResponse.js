const express = require("express");
const router = express.Router();
const formidable = require('formidable');
// Load input validation
const validateOrderResponseInput = require("../../validation/orderResponse")
// Load User model
const Order = require("../../models/order");

router.post("/farmerresponse/:id", (req, res) => {
    let id = req.params.id;
    console.log("id")
    console.log(id)

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

        let order = new Order(fields)

        return res.json(order)


        // Save the new post

        // order.save((err, success) => {
        //     if (err) {
        //         return res.status(400).json({
        //             error: errorHandler(err)
        //         });
        //     }
        //     res.json(success);
        // });
    });
});

order = (req, res, next, id, order) => {
    Order.update({ farmerId: id }, { order });
};
router.param('id', order)


module.exports = router;