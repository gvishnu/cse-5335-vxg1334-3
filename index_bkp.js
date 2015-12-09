var mongoose = require('mongoose');
//var fs = require('fs');
//var converter = require('csvtojson').Converter;
var express = require('express');
var router = express.Router();
var app = express();

//app.set('port', (process.env.PORT || 5000));

console.log('Connected to MongoDb...');
mongoose.connect('mongodb://tej:chaganti@ds055564.mongolab.com:55564/heroku_8r4q6gwf');
var conn = mongoose.connection;

conn.on('error', function(err){

  console.log('Connection error', err);
});
conn.once('open', function(){

  //console.log('Connected...');
});
var Schema = mongoose.Schema;
var Players_100_schema = new Schema({Player_id : Number, Player_name : String, Firstname : String, Lastname : String, DOB : Number,
  Country : String, Height : Number, Club : String, Position : String, Caps : Number, Is_captain : String});

var Player = mongoose.model('Player', Players_100_schema,'Players');


router.get('/', function(req, res) {


    res.render('index');
  });


router.get('/data', function(req, res) {

  Player.find().exec(function(err, player){

    if(err) throw err;
    res.end(JSON.stringify(player));
   // conn.close();

  });
});


module.exports = router;
