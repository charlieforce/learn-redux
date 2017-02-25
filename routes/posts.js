var express = require('express');
var router = express.Router();
var async = require('async');
var dataAccess = require('../dataAccess/dbWrapper.js');
var ObjectID = require('mongodb').ObjectID;
var multer = require('multer');
var path = require('path');
var userImagesPath = path.resolve(__dirname, "../uploads");
/**
 * Configuration of multer to save imagesStorage
 */
var imagesStorage = multer.diskStorage({
    // used to determine within which folder the uploaded files should be stored.
    destination: function(req, file, callback) {
        callback(null, userImagesPath);
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});
///Configuring file system storage (recomended to store images and files)
var uploadImages = multer({ storage: imagesStorage });
/**
To create a post with image + multer middlerware to post images also
*/
router.post('/create',uploadImages.single("userImage"), function (req, res) {
     console.log("Uploaded file: ", req.file); //audio that was uploaded.
    if(req.body.caption ){
         console.log("Uploaded file: ", req.file); //audio that was uploaded.
        dataAccess.insertOne('posts',
        {
            "code":"BAcyDyQwcXX",
            "caption":req.body.caption,
            "likes":0,
            "comments":[],
            "display_src": '/' + req.file.originalname
        },
        function (err, data) {
        console.log(err || data);
        if (err) {
                    res.status(422).json({
                        success: false, message: 'Could not process your request. Please try again!', code: 422, data: {}
                    });
                }
                else {
                    // res.status(200).json({
                    //     success: true, message: 'OK', code: 200, data: {}
                    // });
                    //redirecting to main page 
                    res.redirect('/');
                }
        });
    }
    else{
        res.status(400).json({
            success: false, message: 'Missing required parameters!', code: 400, data: {}
        });
    }
});
/**
To create a post with image + multer middlerware to post images also
*/
router.post('/create/data', function (req, res) {
    if(req.body.caption ){
        dataAccess.insertOne('posts',
        {
            "code":"BAcyDyQwcXX",
            "caption":req.body.caption,
            "likes":0,
            "comments":[],
            "display_src": req.body.userImage,
            "file_name":req.body.fileName,
            "ext":req.body.ext
        },
        function (err, data) {
        console.log(err || data);
        if (err) {
                    res.status(422).json({
                        success: false, message: 'Could not process your request. Please try again!', code: 422, data: {}
                    });
                }
                else {
                    console.log('image successfully saved')
                    // res.status(200).json({
                    //     success: true, message: 'OK', code: 200, data: {}
                    // });
                    //redirecting to main page 
                    res.redirect('/');
                }
        });
    }
    else{
        res.status(400).json({
            success: false, message: 'Missing required parameters!', code: 400, data: {}
        });
    }
});
/**
To get random posts
@params {post_id:''}
*/
router.get('/random', function (req, res) {
        dataAccess.aggregate('posts', [
        {
            '$project': {
                "code": 1,
                "caption":1,
                "likes":1,
                "id":"$_id",
                "_id":0,
                "comments":1,
                "display_src":1
            }
        }
    ],function (err, data) {
        console.log(err || data);
        if (err) {
                    res.status(422).json({
                        success: false, message: 'Could not process your request. Please try again!', code: 422, data: {}
                    });
                }
                else {
                    res.status(200).json({
                        success: true, message: 'OK', code: 200, data: data
                    });
                }
        });
});
module.exports = router;