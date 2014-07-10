var express = require('express');
var router = express.Router();


/*
 * GET userlist.
 */
router.get('/list', function(req, res) {
    var db = req.db;
    db.collection('person').find().toArray(function (err, items) {
        res.json(items);
    });
});


/*
 * POST to adduser.
 */
router.post('/add', function(req, res) {
    var db = req.db;
    db.collection('person').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

//on routes that end in /bears/:bear_id
//----------------------------------------------------
router.get('/list/:id', function(req, res) {
	    var db = req.db;
	    var _id = req.params.id;
		db.collection('person').findById(_id, function(err, person) {
			res.json(person);
		});
	});


/*
 * DELETE to deleteuser.
 */
router.delete('/del/:id', function(req, res) {
    var db = req.db;
    var personToDelete = req.params.id;
    db.collection('person').removeById(personToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

/*
router.post('/update/:id', function(req, res) {
	console.log("POST: "+req.params.id);
	var db = req.db;
	var personToUpdate = req.params.id;
	
		db.collection('person').update({'_id': req.params.id}, {$set: {'surname': req.body.surname}},{ w : 0 })
	
});
*/
router.post('/update/:id', function(req, res) {
	ObjectID = require('mongoskin').ObjectID;
	console.log("POST: "+req.params.id);
	var db = req.db;
	db.collection('person').update({_id: new ObjectID(req.params.id)},
			{$set:{nick:req.body.nick,name:req.body.name,surname:req.body.surname}},
			function(err) {
		res.send(
	            (err === null) ? { msg: '' } : { msg: err }
	        );
	   
	});
	
});

module.exports = router;
