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
		spotifyLookup();

		break;

	case 'movie':
		console.log('Searching OMDB for ' + '"' + searchString + '"');
		movieLookup();

		break;

	case 'concert':
		console.log('You have selected Bands in Town');
		break;

	default:
		console.log('"' + api + '"' + ' is not a recognized command');

		break;
}

function spotifyLookup() {
	spotify.search(
		{
			type: 'track',
			query: searchString,
			limit: 5
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

function movieLookup() {
	const queryUrl =
		'http://www.omdbapi.com/?t=' +
		searchString +
		'&y=&plot=short&apikey=trilogy';

	axios
		.get(queryUrl)
		.then(response => {
			// console.log(response.data.Title);
			// console.log(response.data.Year);
			// console.log(response.data.Rated);
			// console.log(response.data.Actors);
			// console.log(response.data.Plot);
			// console.log(response.data.Awards);

			console.log(
				'-----------------------------------' +
					'\nTitle: ' +
					response.data.Title +
					'\nYear: ' +
					response.data.Year +
					'\nRated : ' +
					response.data.Rated +
					'\nStarring : ' +
					response.data.Actors +
					'\nPlot : ' +
					response.data.Plot +
					'\nAwards : ' +
					response.data.Awards +
					'\n-----------------------------------'
			);
		})
		.catch(function(error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log('---------------Data---------------');
				console.log(error.response.data);
				console.log('---------------Status---------------');
				console.log(error.response.status);
				console.log('---------------Status---------------');
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an object that comes back with details pertaining to the error that occurred.
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			console.log(error.config);
		});
}
