var express = require('express');
const apiRouter = express.Router();
var myGenericMongoClient = require('./my_generic_mongo_client');

apiRouter.route('/events-api/public/events/:id')
.get( function(req , res  , next ) {
	var idEvent = req.params.id;
	myGenericMongoClient.genericFindOne('fusionEbenafrica',
										{ 'id' : idEvent },
									    function(err,event){
										   res.send(event);
									   }
									   );
	
});

apiRouter.route('/events-api/public/events')
.get( function(req , res  , next ) {
	var changeMini = Number(req.query.changeMini);
	var mongoQuery = changeMini ? { change: { $gte: changeMini }  } : { } ;
	myGenericMongoClient.genericFindList('fusionEbenafrica',mongoQuery,function(err,events){
		   res.send(events);
	});
});

apiRouter.route('/events-api/public/user/events')
.post( function(req , res  , next ) {
	var nouvelleEvent = req.body;
	console.log("POST,nouvelleEvent="+JSON.stringify(nouvelleEvent));
	nouvelleEvent._id=nouvelleEvent.id;
	myGenericMongoClient.genericInsertOne('fusionEbenafrica',
										nouvelleEvent,
									     function(err,events){
										     res.send(nouvelleEvent);
									    });
});

// http://localhost:8282/devise-api/private/role-admin/devise en mode PUT
// avec { "code" : "USD" , "nom" : "Dollar" , "change" : 1.123 } dans req.body
apiRouter.route('/events-api/public/user/events')
.put( function(req , res  , next ) {
	var newValueOfEventToUpdate = req.body;
	console.log("PUT,newValueOfEventToUpdate="+JSON.stringify(newValueOfEventToUpdate));
	myGenericMongoClient.genericUpdateOne('fusionEbenafrica',
	newValueOfEventToUpdate.id ,
	{ 
		titre : newValueOfEventToUpdate.titre,
		lieu : newValueOfEventToUpdate.lieu,
		desc : newValueOfEventToUpdate.desc,
		debut : newValueOfEventToUpdate.debut,
		fin : newValueOfEventToUpdate.fin,
		heure : newValueOfEventToUpdate.heure,
		logo : newValueOfEventToUpdate.logo,
		url : newValueOfEventToUpdate.url,
	} ,
	function(err,devise){
			if(err){
				res.status(404).json({ error : "no event to update with id=" + newValueOfEventToUpdate.id });
			}else{
					res.send(newValueOfEventToUpdate);
			 }
	});	//end of genericUpdateOne()
});

// http://localhost:8282/devise-api/private/role-admin/devise/EUR en mode DELETE
apiRouter.route('/events-api/public/user/events/:id')
.delete( function(req , res  , next ) {
	var idEvent = req.params.id;
	console.log("DELETE,idEvent="+idEvent);
	myGenericMongoClient.genericRemove('fusionEbenafrica',{ _id : idEvent },
									     function(err,devise){
										     res.send({ deletedEventId : idEvent } );
									    });
});


apiRouter.route('/boutique-api/public/articles')
.get( function(req , res  , next ) {
	var changeMini = Number(req.query.changeMini);
	var mongoQuery = changeMini ? { change: { $gte: changeMini }  } : { } ;
	myGenericMongoClient.genericFindList('fusionAfrikrea',mongoQuery,function(err,articles){
		   res.send(articles);
	});
});

exports.apiRouter = apiRouter;