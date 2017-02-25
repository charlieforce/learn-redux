
//----------------- EDIT THIS FILE TO INSERT YOUR OWN VIDEOS -------

var dataAccess = require('./dataAccess/mongoClient.js').mongoClient;
dataAccess = new dataAccess();
var ObjectID = require('mongodb').ObjectID;
// dataAccess.insertMany('posts',[{
//       "code":"BAcJeJrQca9",
//       "caption":"Snow! ⛄️🌨❄️ #lifewithsnickers",
//       "likes":59,
//       "display_src":"https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12407344_1283694208323785_735653395_n.jpg"
//    },
//    {
//       "code":"BAF_KY4wcRY",
//       "caption":"Cleaned my office and mounted my recording gear overhead. Stoked for 2016!",
//       "likes":79,
//       "display_src":"https://scontent.cdninstagram.com/hphotos-xpf1/t51.2885-15/e35/923995_1704188643150533_1383710275_n.jpg"
//    },
//    {
//       "code":"BAPIPRjQce9",
//       "caption":"Making baby pancakes for one early rising baby. ☕️🍴",
//       "likes":47,
//       "display_src":"https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/12407480_1654828594805097_152207166_n.jpg"
//    }],function (err, data) {
//        console.log(err || data);
// });
//dataAccess.connect(function (err, db) {
//    db.collection('groups').deleteMany({ name: 'Group1' }, function (err, status) {
//        console.log(err || status);
//        db.close();
//    });
//});
// dataAccess.find('posts', { _id: ObjectID('58a4a2a3d1954005946a828d') }, function (err, data) {
    
// dataAccess.updateOne('posts', { _id: ObjectID('58a4a2a3d1954005946a828d') }, {
//     $set :{
//         likes: (data[0]['likes'] + 1)}
//    }, function (err, status) {
//    console.log(err || status);
//    dataAccess.find('posts', { _id: ObjectID('58a4a2a3d1954005946a828d') }, function (err, data) {
//     console.log(err || data);
// });
// });
// });

// dataAccess.deleteOne('posts',{"likes":60},function(err,status){
//     console.log(err || status);
// });