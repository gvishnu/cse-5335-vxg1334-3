var mongoose = require('mongoose');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

console.log('Connected to MongoDb...');
mongoose.connect('mongodb://john:cena@ds055564.mongolab.com:55564/heroku_dtlpkmtx');
var conn = mongoose.connection;

conn.on('error', function(err){

  console.log('Connection error', err);
});
conn.once('open', function(){

  //console.log('Connected...');
});
var Schema = mongoose.Schema;

var Players_100_schema = new Schema({id : Number, a : Number, b : String, c : String, d : Number});

var flower = mongoose.model('flower', Players_100_schema,'flowers');


app.get('/', function(req, res) {


    res.render('pages/index');
  });


app.get('/data', function(req, res) {

  flower.find().exec(function(err, flower){

    if(err) throw err;
    res.end(JSON.stringify(flower));
   // conn.close();

  });
});



