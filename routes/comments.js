var express = require('express');
var router = express.Router();
var async = require('async');
var dataAccess = require('../dataAccess/dbWrapper.js');
var ObjectID = require('mongodb').ObjectID;
/**
To create a comment
@params {id:'id of the post',user:'user id who comment',text:'text of comment'}
*/
router.post('/create', function (req, res) {
    console.log(req.body)
    if(req.body.id && req.body.user && req.body.text){
        dataAccess.updateOne('posts',{ _id: ObjectID(req.body.id) },
        {
            "$addToSet" :{
                comments: {user:req.body.user,text:req.body.text}
            }
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
    }
    else{
        res.status(400).json({
            success: false, message: 'Missing required parameters!', code: 400, data: {}
        });
    }
});
/**
To get all comment on a post
@params {post_id:''}
*/
router.get('/post', function (req, res) {
    if(req.query.id){
        dataAccess.aggregate('posts', [
        { '$match': { _id: ObjectID(req.query.id) }},
        {
            '$project': {
                "id": "$_id",
                "comments": 1,
                "_id":0
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
    }
    else{
        res.status(400).json({
            success: false, message: 'Missing required parameters!', code: 400, data: {}
        });
    }
});
module.exports = router;