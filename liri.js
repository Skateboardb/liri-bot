require('dotenv').config();
const axios = require('axios');
const Spotify = require('node-spotify-api');

const keys = require('./keys');

const spotify = new Spotify(keys.spotify);

let api = process.argv[2];
let searchString = process.argv.slice(3).join(' ');
switch (api) {
	case 'spotify':
		console.log('Searching Spotify for ' + '"' + searchString + '"');
		spotifyFunction();

		break;

	case 'movie':
		console.log('You have selected OMDB');

		break;

	case 'concert':
		console.log('You have selected Bands in Town');
		break;

	default:
		console.log('"' + api + '"' + ' is not a recognized command');

		break;
}

function spotifyFunction() {
	spotify.search(
		{
			type: 'track',
			query: searchString,
			limit: 10
		},
		(err, data) => {
			if (err) {
				console.log(err);
			}
			// console.log(data.tracks.items);
			// console.log(data.tracks.items);
			// console.log(data.tracks.items[0].artists);

			for (let i = 0; i < data.tracks.items.length; i++) {
				let info = data.tracks.items[i];
				console.log(
					'-----------------------------------' +
						'\nArtist(s): ' +
						JSON.stringify(info.artists[0].name).replace(/\"/g, '') +
						'\nTitle: ' +
						info.name +
						'\nAlbum : ' +
						info.album.name +
						'\n-----------------------------------'
				);
			}
		}
	);
}
