//require('./db');
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var routes = require('./routes/index');
// var users = require('./routes/users');

// var bookers = require('./controllers/books');
// var bookModel = require('./models/Book');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
//app.set('view engine', 'vash');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);

// /// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// //app.get('/api/books', books.getBooks);

// /// error handlers

// // development error handler
// // will print stacktrace


// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

app.get('/', function(req, res){
    res.render('index', {title:"hello"});
});

var api = require('./server/controllers/api.js');
app.get('/book', api.list);
app.get('/chapters/:bookid', api.chapters);
app.get('/notes/:bookid/:chapid', api.notes);
app.get('/getBookId/:name', api.getBookId);
app.post('/update', api.post);
app.post('/addBook', api.addBook);
app.post('/removeBook', api.removeBook); 
app.post('/addChapter', api.addChapter); 
app.post('/removeChapter', api.removeChapter); 

// app.set('port', process.env.PORT || 3000);

// var server = app.listen(app.get('port'), function() {
//   //debug('Express server listening on port ' + server.address().port);
//   console.log("cool");
//});


var server = app.listen(process.env.PORT || 3001, function(){
    console.log("cool");
});

//module.exports = app;
