var express    = require('express');
var mysql      = require('mysql');
var os = require("os");
var connection = mysql.createConnection({
  host     : process.env.MYSQL_ADDRESS,
  user     : process.env.MYSQL_USERNAME,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE
});

var app = express();

connection.connect(function(err){
  if(!err) {
    console.log("Database is connected ... \n");
  } else {
    console.log("Error connecting database ... \n");
  }
});

// create table if needed and seed
connection.query("CREATE TABLE IF NOT EXISTS tests ( counter INT(6) UNSIGNED );", function(err, rows, fields) {
  if (!err) {
    connection.query("INSERT INTO tests (counter) VALUES (1);")
  }
});

app.get("/",function(req,res){
  connection.query('SELECT counter from tests LIMIT 1', function(err, rows, fields) {
    if (!err) {
      res.send('<span style="font-family: Arial; font-size: 30px;">I\'m running on <b>' + os.hostname() + '</b> and so far I\'v had <b>' + rows[0].counter + '</b> hits</span>');
      connection.query('UPDATE tests SET counter = counter + 1;');
    } else {
      console.log('Error while performing Query.');
    }
  });
});

app.listen(3000);
