let express = require('express')
let request = require('request')
var cors = require('cors');
let querystring = require('querystring')
var cookieParser = require('cookie-parser');
var app = express();

var client_id = process.env.SPOTIFY_CLIENT_ID 
// || '76e92a01f8a74ddf9f730783284c4606'; // Your client id
var client_secret = process.env.SPOTIFY_CLIENT_SECRET 
// || 'ff2d04238d1a4e7ea8a197d65f99cb6d'; // Your secret
// var redirect_uri = 'http://localhost:4002/callback'; // Your redirect uri
var redirect_uri = process.env.REDIRECT_URI 
|| 'http://localhost:4002/callback'
var uri = process.env.FRONTEND_URI 
|| 'http://localhost:3000'


var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

app.get('/login', function(req, res) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    // your application requests authorization
    var scope = 'user-read-private user-read-email user-read-playback-state';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
});

app.get('/callback', function(req, res) {

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
    res.redirect(uri + '?access_token=' + access_token)
  })
})

let port = process.env.PORT || 4002
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)