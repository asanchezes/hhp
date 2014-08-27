var express = require('express');
var router = express.Router();
var document='observation';
var async=require('async');


/*
 * list
 */
router.get('/list', function(req, res) {
    var db = req.db;
    db.collection(document).find().toArray(function (err, items) {
        res.json(items);
    });
});




router.get('/listB', function(req, res) {
    var db = req.db;
    var person;
    var items=new Array();
    ObjectID = require('mongoskin').ObjectID;
    

    function writeResult(items)
    {
    	console.log(items[items.length-1]);
    	res.writeHead(200, {"Content-Type": "text/html"});
        res.write("Hola Mundo");
        res.end('');
    }
    
    function procList(err,resultCursor)
    {
    	
        	var first=true;
        	//res.writeHead(200, { 'Content-Type': 'application/json' });   
            resultCursor.each(function(err, item) {
            	
            	console.log('registres: '+resultCursor.count());
            	
            	function getPerson(item,first)
                {
            		
                	if (item)
                	{
                		var id=item.person_id;
	                	ObjectID = require('mongoskin').ObjectID;
	                	
	                	db.collection('person').findById(ObjectID(id),function(err, doc) {
	                		
	                		item.person=doc;
	                		console.log(item);
	                		items[items.length]=item;
	                		//res.write(first?'':',');
	                        //res.write(JSON.stringify(item));
	                        console.log(items.length);		
	                	}
	                	
	                	);	
                	} else writeResult(items);
                	
                }
            	
            	/*
            	if (item) {
            		
            		getPerson(item.person_id,first);
            			
            		if (first) {first=false;}
            		
                } else {writeResult(items);}
            	
            	*/
            	
            	getPerson(item,first);
            	if (first) {first=false;}
            }
          
            );
            
            
        	
    	
    	
    }
    
    
     db.collection(document).find({}, function(err, resultCursor) {
    	 procList(err, resultCursor);
    	 
     }	 
     )
     
     ;
     
     
});


router.get('/listE', function(req, res) {
	var db = req.db;
	var person;
	var itemsB=new Array();
	
	
	function writeResult()
    {
		
		/*
    	console.log('Final');
    	res.writeHead(200, {"Content-Type": "text/html"});
        res.write("Hola Mundo");
        res.end('');
        */
		res.json(itemsB);
    }
	

	ObjectID = require('mongoskin').ObjectID;
	db.collection(document).find().toArray(function (err, items,callback) {
        
	
		 async.forEach(items, function(item, callback) { //The second argument (callback) is the "task callback" for a specific messageId
		        
			
			if (item)
			{
			var id=item.person_id;
			ObjectID = require('mongoskin').ObjectID;
         	console.log(id);
         	
         	db.collection('person').findById(ObjectID(id),function(err, doc) {
         		
         		item.person=doc;
         		//console.log(item);
         		itemsB[itemsB.length]=item;
         	    		
                 callback();
         	});
         	
			} else callback();
			
		 }	
		 	 
			, function(err) {

				writeResult();
		 
			}
		        
	);
	
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
