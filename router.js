var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const  url = "mongodb://admin:paror123@ds237620.mlab.com:37620/books2db?ReplicaSet=rs-ds237620";
var searchres;
const ObjectId = require('mongodb').ObjectID
var urlencodedParser = bodyParser.urlencoded({ extended: false });


var badres = [{
	  description: {
	    _text: 'not find'
	  },
	  picture: {
	    _text: ''
	  }
	   },
	  {
	    description: {
	      _text: 'try again'
	    },
	    picture: {
	      _text: ''
	    }
	}]

function searchRequestConstr(req) {
	  let element = {};
	  let result =[];

	  if(req.body.search){
	    console.log('true');
	    element.author = {_text: req.body.search};
	  }
	  if(req.body.bookName)
	    element.name = {_text: req.body.bookName};

	  if(Object.keys(element).length)
	    result.push(element);

	  if(req.body.year1&&req.body.year2)
	    result.push({'year._text': {$gte: req.body.year1, $lte: req.body.year2}});

	  if(req.body.coast1&&req.body.coast2)
	    result.push({'price._text': {$gte: req.body.coast1, $lte: req.body.coast2}});

	  console.log('search');
	  console.log(result);
	  if (result.length) {
	    return result;
	    }
	    else {
	      return 0;
	    }
	}

	function getValidResponse(searchResult) {
			let obj ={};
			obj.author = searchResult.author._text;
			obj.description = searchResult.description._text;
			if(Array.isArray(searchResult.picture)){
				obj.picture = searchResult.picture[0]._text;
			}
			else{
					obj.picture = searchResult.picture._text;
				}
			obj.isbn = searchResult.ISBN._text;
			obj.lang = searchResult.language._text;
			obj.price = searchResult.price._text;
			obj.year = searchResult.year._text;
			obj.name = searchResult.name._text;
			obj.id = searchResult._id;
			if (searchResult.store._text=="true") {
				obj.store = true;
			} else {
				obj.store = false;
			}
			return obj;
}

module.exports = function(){
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.sendfile('/dist/index.html');
	});

	router.post('/news', urlencodedParser, function (req, res) {
		console.log('post');
	  let element = searchRequestConstr(req);
	  if(element){
	    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client){
					  if (err) {
					  	throw err;
					  }
	          var db = client.db();
	          var count = 0;
	          console.log('first' + req.body.first + 'last' + req.body.last);
	          db.collection('books').find({$and: element }).skip(+req.body.first).limit(+req.body.last).toArray()
	          .then(response => {
	           if(response.length>0){
	             res.send({searchResult: response});
	           }
	           else{
	             res.send({searchResult: "empty"});
	           }
	           client.close();
	           return 0;
	         });
	      });
	  }
	  else {
	    console.log('empty');
	    res.send({searchResult: "empty"});
	  }
	});

	router.get('/news', function (req, res) {
	  MongoClient.connect(url, function(err, client){
	        var db = client.db('books2db');
	        db.collection('books').find().skip(Math.random()*10000+2
	      ).limit(5).toArray()
	        .then(response => {
	           if(response.length>0){
	           res.send({searchResult: response});
	         }
	         else{
	           // res.render('news', {data: badres});
	         }
	         client.close();
	         return 0;
	       });
	    });
	});



	router.post('/test', urlencodedParser, function (req, res) {
	  console.log('getted');
	  console.log(req);
	  res.send({test: req})
	})

	router.post('/one', urlencodedParser, function(req, res){
	  MongoClient.connect(url, function(err, client){
	        var db = client.db();
	        db.collection('books').findOne({_id: ObjectId(req.body.id)} )
	        .then(response => {
	          res.send({searchResult: response});
	          client.close();
	        }) ;
	    });
	})



	router.get('/one/:id', urlencodedParser, function(req, res){
	  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client){
	        var db = client.db();
	        db.collection('books').findOne({_id: ObjectId(req.params.id)} )
	        .then(response => {
						console.log(response);
	          res.send({book: getValidResponse(response)});
	          client.close();
	        }) ;
	    });
	})

	router.get('/error', function (req, res) {
		res.send({answer: false});
	})

	return router;
}
