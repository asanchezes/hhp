var express = require('express');
var router = express.Router();
var document='variable';


/*
 * list
 */
router.get('/list', function(req, res) {
    var db = req.db;
    db.collection(document).find().toArray(function (err, items) {
        res.json(items);
    });
});


/*
 * add
 */
router.post('/add', function(req, res) {
    var db = req.db;
    db.collection(document).insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * list/:id
 */
router.get('/list/:id', function(req, res) {
	    var db = req.db;
	    var _id = req.params.id;
		db.collection(document).findById(_id, function(err, doc) {
			res.json(doc);
		});
	});


/*
 * del
 */
router.delete('/del/:id', function(req, res) {
    var db = req.db;
    db.collection(document).removeById(req.params.id, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});


router.post('/update/:id', function(req, res) {
	ObjectID = require('mongoskin').ObjectID;
	console.log("POST: "+req.params.id);
	var db = req.db;
	delete req.body['_id'];
	
	db.collection(document).update({_id: new ObjectID(req.params.id)},
					{$set:req.body},
	
			function(err) {
		res.send(
	            (err === null) ? { msg: '' } : { msg: err }
	        );
	   
	});
	
});

module.exports = router;
