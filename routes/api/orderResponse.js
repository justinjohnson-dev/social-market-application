const express = require("express");
const router = express.Router();
const objectId = require('mongodb').ObjectID;
const formidable = require('formidable');
// Load input validation
const validateOrderResponseInput = require("../../validation/orderResponse")
// Load User model
const Order = require("../../models/order");

router.put("/farmerresponse/:id", (req, res) => {
    let id = req.params.id;

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
        const { items, quantity, userId, farmerId } = fields
        if (!items || !quantity || !userId || !farmerId) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let order = new Order(fields)

        // find and save updated order
        Order.findOne({ _id: id }, function (err, foundOject) {
            if (err) {
                console.log(err)
                res.status(500).send()
            } else {
                if (!foundOject) {
                    res.status(404).send();
                } else {

                    foundOject.status = order.status;
                    foundOject.comment = order.comment;
                    foundOject.completed = order.completed;

                    foundOject.save(function (err, updatedObject) {
                        if (err) {
                            console.log(err);
                            res.status(500).send();
                        } else {
                            res.send(updatedObject);
                        }
                    })
                }
            }
        });
    });
});


module.exports = router;