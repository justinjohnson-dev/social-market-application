const express = require("express");
const router = express.Router();
const formidable = require('formidable');
// Load input validation
const validateOrderInput = require("../../validation/order")
// Load User model
const Order = require("../../models/order");

router.post("/createorder", (req, res) => {
    // using the formidable package to handle
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields) => {
        // Form validation
        const { errors, isValid } = validateOrderInput(fields);

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

router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.json({ message: "Error" })
    }
});

orderByFarmerId = (req, res, next, id) => {
    Order.find({farmerId: id}).exec((err, order) => {
        if(err || !order) {
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.order = order
        next();
    })
};

orderByUserId = (req, res, next, id) => {
    Order.find({userId: id}).exec((err, order) => {
        if(err || !order) {
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.order = order
        next();
    })
};

searchByFarmerId = (req, res) => {
    req.order.farmerId = undefined
    return res.json(req.order)
};

searchByUserId = (req, res) => {
    req.order.userId = undefined
    return res.json(req.order)
};

router.get('/orders/farmer/:orderByFarmerId', searchByFarmerId);
router.get('/orders/user/:orderUserId', searchByUserId)
router.param('orderByFarmerId', orderByFarmerId)
router.param('orderUserId', orderByUserId);


module.exports = router;