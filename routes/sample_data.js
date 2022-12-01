var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM project ORDER BY title";

	database.query(query, function(error, data){

		if(error) {
			throw error; 
		}
		else {
			response.render('sample_data', {title:'BCA Research Hub', action:'list', sampleData:data});
		}

	});

});

module.exports = router;
