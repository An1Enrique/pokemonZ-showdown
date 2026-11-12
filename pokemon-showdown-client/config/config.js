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
Config.version = "0.11.2 (c3deb639)";
Config.translationCachebuster = "a8900b40";

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
var _loc = (typeof window !== 'undefined' && window.location) ? window.location : null;
var _hostname = (_loc && _loc.hostname) ? _loc.hostname : 'localhost';
var _isStaticEdge = (
	_hostname.endsWith('.pages.dev') ||
	_hostname.endsWith('.github.io') ||
	_hostname.endsWith('.netlify.app') ||
	_hostname.endsWith('.vercel.app')
);
var _defaultBackendHost = 'pokemonz-showdown-9ac4.onrender.com';
var _isHttps = _isStaticEdge ? true : !!(_loc && _loc.protocol === 'https:');
var _port = _isStaticEdge ? 443 : (_loc ? (_loc.port ? parseInt(_loc.port, 10) : (_isHttps ? 443 : 80)) : 8080);

Config.routes.client = (_loc && _loc.host) ? _loc.host : 'localhost:8080';
Config.routes.sprites = '/sprites';
Config.routes.action = 'local';
Config.routes.users = Config.routes.client + '/users';

Config.server = {
	id: 'pokemonz',
	protocol: _isHttps ? 'https' : 'http',
	host: _isStaticEdge ? _defaultBackendHost : _hostname,
	port: _port,
	httpport: _port,
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
