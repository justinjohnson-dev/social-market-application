const express = require("express");
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
// Load Post model
const Post = require("../../models/post");


router.post("/createpost", (req, res) => {
    // using the formidable package to handle
    // Images coming from form
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        console.log(fields);
        console.log(files.photo);

        // Check to make sure all fields are filled out
        const { description, location, photo, farmer } = fields
        if (!description || !location || !farmer) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let post = new Post(fields)
        console.log(fields)

        // Need to pass in what you name image
        console.log("files photo: ")
        console.log(photo)

        if (files.photo) {
            // 1mb = 1000000
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }

            // using file system to read data
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type
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

module.exports = router;