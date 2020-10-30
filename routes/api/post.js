const express = require("express");
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
// Load Post model
const Post = require("../../models/post");
const validatePostInput = require("../../validation/post")

router.post("/createpost", (req, res) => {
    // using the formidable package to handle
    // Images coming from form
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        // Form validation
        const { errors, isValid } = validatePostInput(fields, files);
        console.log(files);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        // Check to make sure all fields are filled out
        const { description, location, farmer } = fields
        if (!description || !location || !farmer) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let post = new Post(fields)
        if (files.photo) {
            // 3mb = 3000000
            if (files.photo.size > 3000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }

            // using file system to read data
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type
        }

        if (files.highlight1) {
            post.highlight1.data = fs.readFileSync(files.highlight1.path)
            post.highlight1.contentType = files.highlight1.type
        }

        if (files.highlight2) {
            post.highlight2.data = fs.readFileSync(files.highlight2.path)
            post.highlight2.contentType = files.highlight2.type
        }

        // Save the new post
        post.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(success);
        });
    });
});

// Viewing any posts photo, using the content-type we created in schema
photo = (req, res, next) => {
    if (req.post.photo.data) {
        res.set('Content-Type', req.post.photo.contentType);
        return res.send(req.post.photo.data);
    }
    next();
};

photoHighlight = (req, res, next) => {
    if (req.post.highlight1.data) {
        res.set('Content-Type', req.post.highlight1.contentType);
        return res.send(req.post.highlight1.data);
    }
    next();
};

photoHighlight2 = (req, res, next) => {
    if (req.post.highlight2.data) {
        res.set('Content-Type', req.post.highlight2.contentType);
        return res.send(req.post.highlight2.data);
    }
    next();
};

list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    // need to parse limit to an integer for query
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    Post.find()
        .select("-photo")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: "Post is not found"
                });
            }
            res.json(success);
        });
};

postById = (req, res, next, id) => {
    Post.findById(id).exec((err, post) => {
        if (err || !post) {
            return res.status(400).json({
                error: "Post not found"
            });
        }

        req.post = post
        next();
    });
};

// routes
router.get('/posts/photo/:postId', photo)
router.get('/posts/highlight/:postId', photoHighlight)
router.get('/posts/highlight2/:postId', photoHighlight2)
router.get('/posts', list);
router.param('postId', postById);


module.exports = router;