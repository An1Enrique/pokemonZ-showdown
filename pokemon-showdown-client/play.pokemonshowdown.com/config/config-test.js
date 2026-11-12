/** @type {import('../play.pokemonshowdown.com/src/client-main').PSConfig} */
var Config = Config || {};

/* version */ Config.version = "0";

Config.bannedHosts = ['cool.jit.su', 'pokeball-nixonserver.rhcloud.com'];

Config.whitelist = [
	'wikipedia.org'
];

Config.roomsFirstOpenScript = function () {
};

Config.customcolors = {
	'zarel': 'aeo'
};

/*** Begin automatically generated configuration ***/
Config.version = "0.11.2";
Config.translationCachebuster = "218b1b55";

Config.routes = {
	root: 'pokemonshowdown.com',
	client: 'play.pokemonshowdown.com',
	dex: 'dex.pokemonshowdown.com',
	replays: 'replay.pokemonshowdown.com',
	users: 'pokemonshowdown.com/users',
	teams: 'teams.pokemonshowdown.com',
};
/*** End automatically generated configuration ***/

// Local Pokemon Z overrides (kept outside AUTOCONFIG block so `node build` preserves them)
Config.routes.client = (typeof window !== 'undefined' && window.location && window.location.host) ? window.location.host : 'localhost:8080';

Config.server = {
	id: 'pokemonz',
	protocol: 'ws',
	host: (typeof window !== 'undefined' && window.location && window.location.hostname) ? window.location.hostname : 'localhost',
	port: 8000,
	httpport: 8000,
	prefix: '/showdown',
	registered: false
};

Config.defaultserver = Config.server;

// Serve local sprites first and fallback to official CDN only if a local sprite 404s
if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
	window.addEventListener('error', function (event) {
		var target = event && event.target;
		if (!target || target.tagName !== 'IMG' || target.dataset.cdnFallback) return;
		var src = target.getAttribute('src') || target.src || '';
		var match = src.match(/\/sprites\/(.+)$/);
		if (match) {
			target.dataset.cdnFallback = '1';
			target.src = 'https://play.pokemonshowdown.com/sprites/' + match[1];
		}
	}, true);
}
