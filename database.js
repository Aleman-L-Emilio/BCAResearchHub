const mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'soccerdb.calingaiy4id.us-east-2.rds.amazonaws.com',
	user : 'ale_lew_mus',
	database : 'capstone_2223_bcareshub',
	password : 'QS7FhtcdeLbm'
});

connection.connect(function(error){
	if(error) throw error;
	console.log('MySQL Database is connected Successfully');
});

module.exports = connection;