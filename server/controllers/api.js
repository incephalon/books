var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = new Schema({
    catid: Number,
    name: String
}, { collection: 'Category' });

var Books = new Schema({
    bookid:Number,
    catid: Number,
    name: String
}, { collection: 'Books' });

var Chapter = new Schema({
    chapid:Number,
    bookid: Number,
    name: String
}, { collection: 'Chapter' });

var Note = new Schema({
    bookid:Number,
    chapid: Number,
    text: String
}, { collection: 'Note' });

var Category = mongoose.model('Category', Category);
var Book = mongoose.model('Books', Books);
var Chaptr = mongoose.model('Chapter', Chapter);
var Notr = mongoose.model('Note', Note);

mongoose.connect('mongodb://incephalon:lthnia90_@ds027729.mongolab.com:27729/books');

exports.categories = function(req, res) {
  Category.find().sort({catid: 1}).exec(function(err, categories) {
    res.send(categories);
  });
};

exports.books = function(req, res) {
  Book.find({ 'catid': req.params.catid }, function(err, books) {
    res.send(books);
  });
};

exports.getBookId = function(req, res) {
  //Chaptr.find({ 'bookid': req.params.bookid }, function(err, chapters) {
    Book.find({ 'name': req.params.name }, function(err, books) {
    res.send(books);
  });
};


exports.chapters = function(req, res) {
    Chaptr.find({ 'bookid': req.params.bookid }).sort({ 'chapid': 1 }).exec(function(err, chapters) {
    res.send(chapters);
  });
};

exports.notes = function(req, res) {
  Notr.find({ 'bookid':req.params.bookid,'chapid': req.params.chapid }, function(err, notes) {
    console.log(notes);
    res.send(notes);
  });
};

// exports.post = function(req, res) {
//     new Notr({noteid:"12", chapid: "1", name:"will this work?"}).save();
// }

exports.post = function ( req, res ){
  //res.send('Username: ' + req.body.username);
  // new Notr({bookid:req.body.bookid, chapid: req.body.chapid, text:req.body.text}
  // ).save( function( err, todo, count ){
  //   res.redirect( '/' );
  // });
  //Notr.find( {'bookid':req.params.bookid,'chapid': req.params.chapid}).update({text:req.body.text });

    // Notr.update({'bookid':req.body.bookid,'chapid': req.body.chapid}, {"text":req.body.text }, {upsert: true}, function(err, results){

    // });
  // Notr.upsert({ 'bookid':req.params.bookid,'chapid': req.params.chapid, text:req.body.text }, function(err, notes) {
  //   console.log(notes);
  //   res.send(notes);
  // });
    //   Notr.update({ 'bookid': req.body.bookid,  'chapid': req.body.chapid}, { text: req.body.text}, {}, function (err, not) {
    //      //res.send(not);
    // });

      Notr.update({ 'bookid': req.body.bookid,  'chapid': req.body.chapid}, { text: req.body.text}, {upsert:true}, function (err, not) {
         //res.send(not);
    });

};

exports.addBook = function( req, res ) {
  var catid = req.body.catid; 
  var bookname = req.body.bookname; 
  Book.findOne().sort({'bookid':-1}).exec(function(err, data) {
    var lastBookId = data.bookid; 
    new Book({bookid:lastBookId+1, catid:catid, name:bookname }).save(function(err) {
      res.send({status: err ? 0 : 1, newBookId:lastBookId+1});
    });  
  }); 
}; 

exports.removeBook = function( req, res ) {
  Book.remove({bookid: req.body.bookid}, function(err, removedBook) {
    Chaptr.remove({bookid: req.body.bookid}, function(err, removedChapter) {
      res.send({status: removedBook ? 1 : 0});
    })
  }); 
}

exports.addChapter = function( req, res ) {
  Chaptr.findOne({bookid: req.body.bookid}).sort({'chapid':-1}).exec(function(err, data) {
    var lastChapId = data != null ? data.chapid : 0; 
    new Chaptr({chapid:lastChapId+1, bookid: req.body.bookid, name: req.body.name}).save(function(err) {
        res.send({status: err ? 0 : 1, newChapId: lastChapId+1}); 
    }); 
  }); 
}

exports.removeChapter = function( req, res ) {
  Chaptr.remove({bookid: req.body.bookid, chapid: req.body.chapid}, function(err, removed) {
      res.send({status: removed ? 1 : 0}); 
  }); 
}

// exports.update = function(req, res) {

// 		new Notr({chapid:1, noteid:1, name:"this is my note from the app Four" }).save();

// 		// var contact = new Notr({
// 		// 	bookid:1,
// 		// 	noteid:1,
// 		//     chapid: 1,
// 		//     name: "this is my note from the app three"
// 		// });

// 		// var upsertData = contact.toObject();

// 		// Notr.update({bookid:1}, upsertData, {upsert: true}, function(err, numAffected){

// 		// });
// }