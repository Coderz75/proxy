var url = require('url');
var querystring = require('querystring');
var Unblocker = require('unblocker');
var Transform = require('stream').Transform;
var express = require('express')
var app = express();
function allowframe(data) {
  data.headers['x-frame-options'] = 'allow';
}
var unblocker = new Unblocker({
    prefix: '/unblocked',
      responseMiddleware: [
    allowframe,
  ]
});

app.use(unblocker);

app.use('/', express.static(__dirname + '/public'));

const port = process.env.PORT || process.env.VCAP_APP_PORT || 8080;

app.get("index.html");

app.listen(port).on("upgrade", unblocker.onUpgrade);