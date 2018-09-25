const express = require('express');
const app = express();
const path = require('path');
const port = 8080;
const fs = require('fs');
const bodyParser = require('body-parser');
const config = require('./config/environment');

app.use(function(req, res, next) {
    var allowedOrigins = config.allowedOriginsApi;
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PATCH, PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  console.log(Date.now());
  res.sendFile(path.join(__dirname + "/public/index.html"));
  }
);

//Submits email into email storage
app.post('/', function(req,res){
  console.log("HEY!")
  const emailObject = {
    name: req.body.name,
    email: req.body.email
  };
  /*
  knex.insert(emailObject).into('email_list').asCallback(function(err) {
    if (err) {
      console.log(err);
    }
  });
  fs.appendFile('./emailList.txt', name + ' --- ' + email + ' --- ' + newDate + '\n', function (err) {
    if (err) throw err;
      console.log('Saved Email!');
    });*/
  fs.appendFile('./emailList.txt', emailObject.email + '\n', function(err){
    if(err) {
      throw err;
    }
    console.log('Saved Email!')
  });
  fs.appendFile('./nameList.txt', emailObject.name + '\n', function(err){
    if(err){
      return res.status(401);
    }
    else{
      res.json({
          result: 'success'
        });
    }
    console.log('Saved Email!')
  });


});

app.listen(port, () => console.log('About Us app listening on port ' + port));
