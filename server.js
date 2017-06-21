'use strict';
const http = require("http");
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const api_key = process.env.MAILGUN_API_KEY
const domain = 'sandbox1270eb3af6a2475b9c240b75d7f762b5.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = app.set('port', process.env.PORT || 3000);
app.locals.title = 'Digital Professional';

app.get('/', (request, response) => {
  response.send(app.locals.title);
});

app.post('/sendcard', function(req, res) {
  var data = {
    from: `${req.body.actualName} <${req.body.yourEmail}>`,
    to: req.body.email,
    subject: req.body.subject,
    html: req.body.message
  };

  mailgun.messages().send(data, function (error, body) {
    res.send(body);
  })
});


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = server;
