var express = require('express');
var router = express.Router();
var async = require('async');
var dataAccess = require('../dataAccess/dbWrapper.js');
var ObjectID = require('mongodb').ObjectID;
/**
To increment a like on a post
@params {id:'id of the post'}
*/
router.put('/inc', function (req, res) {
    if(req.body.id){
        //finding that post
        dataAccess.find('posts', { _id: ObjectID(req.body.id) }, function (err, data) {
            //now incrementing likes
        dataAccess.updateOne('posts', { _id: ObjectID(req.body.id) }, {
            $set :{
                likes: (data[0]['likes'] + 1)}
        },function (err, data) {
        console.log(err || data);
        if (err) {
                    res.status(422).json({
                        success: false, message: 'Could not process your request. Please try again!', code: 422, data: {}
                    });
                }
                else {
                    res.status(200).json({
                        success: true, message: 'OK', code: 200, data: {}
                    });
                }
        });
        });
    }
    else{
        res.status(400).json({
            success: false, message: 'Missing required parameters!', code: 400, data: {}
        });
    }
});

module.exports = router;