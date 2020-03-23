require('dotenv').config();
var x = require('axios');

const keys = require('./keys');

// const spotify = new Spotify(keys.spotify);

let api = process.argv[2];

console.log(api);
