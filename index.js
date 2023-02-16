const https = require('follow-redirects').https;
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 9630;

app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function sendFacebook(pageid, msg, token){
  // token = "EAAMxUxZBZCu3QBAFdxL1FZCfYW0ZAqFVST01ZBZAPTeXdOF9uqSoPDUp7ZAGH1OteC7hfI2rRnJEbXfZCOg3wrsypvxs06TXGY9Tsu3QsQgLltLELiR8ElYgbwwVxerB38zOAWFCA0UGmzuAhQd7SNDNlmvVWUXim7BZCSlsTd55sZAdHx1iUblLoW4z30Py6KOQoZD";
  var options = {
    'method': 'POST',
    'hostname': 'graph.facebook.com',
    'path': '/v15.0/'+pageid+'/feed?message='+msg+'&access_token='+token,
    'headers': {
    },
    'maxRedirects': 20
  };
  var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });

  req.end();
}

app.post('/api/facebookapi', (req, res) => {
  const msg = req.body.msg;
  const token = req.body.token;
  const pageid = req.body.pageid;
  // console.log(msg);
  // console.log(token);
  // console.log(pageid);
  sendFacebook(pageid, msg, token);
  res.send(true);
});

app.listen(port, () => {
  console.log(`Hello world app listening on port ${port}!`);
});