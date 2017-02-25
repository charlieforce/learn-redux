/**
 * This is main data access file. It will handle connection to Mondo DB. every file will require this file in order to perform any operation in Mongo DB.
 */
var config = require('../config.js'),
    Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    DBRef = require('mongodb').DBRef;

// Connection URL
var url = config.databases.mongo.instagram;
var self = '';

// Export module with Namespace
var mongoc = exports;

//class constructor
mongoc.mongoClient = function (url) {
    self = this;
    // Use connect method to connect to the server
    self.connect(function (err, db) {
        if (err)
            console.log('Could not connect to mongo server!');
        else {
            console.log('Connected');
            //closing connection
            db.close();
        }
    });
};
/*
Every method will use this function implicitly, use this function explicitly when you have to perform query via db.
@param callback(err,db)
*/
mongoc.mongoClient.prototype.connect = function (callback) {
    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, db) {
        callback(err, db);
    });
};

mongoc.mongoClient.prototype.disconnect = function disconnect(callback) {
    self.connect(function (err, db) {
        if (err) {
            return callback(new Error('ERR_CONNECTING_MONGO'), null);
        }
        db.close();
        console.log('connection to Mongo DB has been closed');
    });

}
/*Insert one document
@param collection
@param data {JSON}
@param callback(err,result)
@param optional (not required)
*/
mongoc.mongoClient.prototype.insertOne = function (collection, data, callback, optional) {
    self.connect(function (err, db) {
        if (err) {
            return callback(new Error('ERR_CONNECTING_MONGO'), null);
        }
        db.collection(collection).insertOne(data, function (err, result) {
            callback(err, result);
            //closing connection
            db.close();
        });
    });
}
/*Insert many document
@param collection
@param data {ARRAY}
@param callback(err,result)
@param optional (not required)
*/
mongoc.mongoClient.prototype.insertMany = function (collection, data, callback) {
    self.connect(function (err, db) {
        if (err) {
            return callback(new Error('ERR_CONNECTING_MONGO'), null);
        }
    db.collection(collection).insertMany(data, function (err, result) {
        callback(err,result);
        //closing connection
        db.close();
        });
    });
}
/*Find multiple records document
@param collection
@param data {ARRAY}
@param callback(err,result)
@param optional (not required)
*/
mongoc.mongoClient.prototype.find = function (collection, data, callback, optional) {
    self.connect(function (err, db) {
        if (err) {
            return callback(new Error('ERR_CONNECTING_MONGO'), null);
        }
        db.collection(collection).find(data, optional).toArray(function (err, docs) {
            callback(err, docs);
            db.close();
        });
    });
}
/*Aggregate result 
@param collection
@param data {ARRAY}
@param callback(err,result)
@param optional (not required)
*/
//DO NOT USE THIS
//This function is in test
mongoc.mongoClient.prototype.aggregate = function (collection,data, callback, optional) {
    self.connect(function (err, db) {
        if (err) {
            return callback(new Error('ERR_CONNECTING_MONGO'), null);
        }
        db.collection(collection).aggregate(data, function (err, docs) {
            callback(err, docs);
            db.close();
        });
    });
}
/*update a document
@param collection
@param refData {JSON} i,e; some ref ID to update document
@param newData new data to update
@param callback(err,result)
@param optional (not required)
*/
mongoc.mongoClient.prototype.updateOne = function (collection, query,update, callback, optional) {
    self.connect(function (err, db) {
        if (err) {
            return callback(new Error('ERR_CONNECTING_MONGO'), null);
        }
        db.collection(collection).updateOne(query, update, optional, function (err, result) {
                callback(err,result);
                db.close();
            });
    });
}
/*update many document with give ref 
@param collection
@param refData {JSON} i,e; some ref ID to update document
@param newData new data to update
@param callback(err,result)
@param optional (not required)
*/
mongoc.mongoClient.prototype.updateMany = function (collection, refData, newData, callback, optional) {
    self.connect(function (err, db) {
        if (err) {
            return callback(new Error('ERR_CONNECTING_MONGO'), null);
        }
        db.collection(collection).updateMany(refData, { $set: newData }, function (err, result) {
            callback(err, result);
            db.close();
        });
    });
}
/*Delete a document
@param collection
@param data {ARRAY}
@param callback(err,result)
@param optional (not required)
*/
mongoc.mongoClient.prototype.deleteOne = function (collection, refData, callback, optional) {
    self.connect(function (err, db) {
        if (err) {
            return callback(new Error('ERR_CONNECTING_MONGO'), null);
        }
        db.collection(collection).deleteOne(refData, function (err, result) {
            callback(err, result);
            db.close();
        });
    });
}
/*Delete many document
@param collection
@param data {ARRAY}
@param callback(err,result)
@param optional (not required)
*/
mongoc.mongoClient.prototype.deleteMany = function (collection, refData, callback, optional) {
    self.connect(function (err, db) {
        if (err) {
            return callback(new Error('ERR_CONNECTING_MONGO'), null);
        }
        db.collection(collection).deleteMany(refData, function (err, result) {
            callback(err, result);
            db.close();
        });
    });
}
