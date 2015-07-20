var express    = require('express');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.MYSQL_ADDRESS,
  user     : process.env.MYSQL_USERNAME,
  password : process.env.MYSQL_PASSWORD,
  database : 'node_app'
});

var app = express();

connection.connect(function(err){
  if(!err) {
    console.log("Database is connected ... \n");
  } else {
    console.log("Error connecting database ... \n");
  }
});

app.get("/",function(req,res){
  connection.query('SELECT counter from tests LIMIT 1', function(err, rows, fields) {
    if (!err) {
      res.send('So far I have ' + rows[0].counter);
      connection.query('UPDATE tests SET counter = counter + 1;');
    } else {
      console.log('Error while performing Query.');
    }
  });
});

app.listen(3000);
