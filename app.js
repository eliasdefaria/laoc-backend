const express = require('express');
const app = express();
const path = require('path');
const port = 8080;
const fs = require('fs');
const bodyParser = require('body-parser');
const config = require('./config/environment');

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const async = require('async');

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

const emailNewUser = function(email){
  console.log("Email function called")
  async.waterfall([
    function(done) {
      let SMTPTransport = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        auth: {
          user: 'laoceancoalition@gmail.com',
          pass: 'makewaves9'
        }
      }));
      let mailOptions = {
        to: email,
        from: 'laoceancoalition@gmail.com',
        subject: 'Welcome to LAOC!',
        html: "<b>Welcome to the LA Ocean Coalition!</b><br><br>By signing up for our newsletter you have requested to receive emails to stay up to date on our events and general info. If you haven’t already, go follow us on <a href='https://www.facebook.com/laoceancoalition/' target='_blank'>Facebook</a>, <a href='https://twitter.com/la_oceans' target='_blank'>Twitter</a>, and <a href='https://www.instagram.com/la_oceans' target='_blank'>Instagram</a><br><br>Can’t wait to see you out there with us making waves."

      };
      SMTPTransport.sendMail(mailOptions, function(err) {
        done(err);
      });
    }
  ], function(err) {
    if(err){
      console.log(err)
    }
  });
}

//Submits email into email storage
app.post('/', function(req,res){
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
  });
  fs.appendFile('./nameList.txt', emailObject.name + '\n', function(err){
    if(err){
      return res.status(401);
    }
    else{
      emailNewUser(emailObject.email)
      res.json({
          result: 'success'
        });
    }
  });
});

app.listen(port, () => console.log('About Us app listening on port ' + port));
