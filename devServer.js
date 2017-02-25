var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));


app.use(require('webpack-hot-middleware')(compiler));

/* all app api routes where data will be save and fetched */
var likes = require('./routes/likes.js');
var comments = require('./routes/comments.js');
var posts = require('./routes/posts.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/posts', posts);
app.use('/api/likes', likes);
app.use('/api/comments', comments);
//specifying public to serve static content
app.use(express.static(path.join(__dirname, 'uploads')));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 7770,function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at '+process.env.PORT || 7770);
});
