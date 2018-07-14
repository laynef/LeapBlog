const fs = require('fs');
const path = require('path');
const axios = require('axios');
const https = require('https');
const _ = require('lodash');
const currentDir = `${__dirname}/../../../`;


module.exports = () => {
    const promise = (time) => new Promise((resolve) => {
        setTimeout(resolve, time);
    });

	return promise(6000).then(() => {
		let now = Date();
		now = now.replace(/\s/g, '');
		const getImagePaths = fs.readdirSync(path.join(__dirname, '..', '..', '..', '..', 'assets', 'img')).map(e => `'/assets/img/${e}?timestamp=${now}'`);
		const getDistPaths = fs.readdirSync(path.join(__dirname, '..', '..', '..', '..', 'assets', 'dist')).map(e => `'/assets/dist/${e}?timestamp=${now}'`);
		const allFiles = getImagePaths.concat(getDistPaths);
		fs.writeFileSync(path.join(__dirname, '..', '..', '..', '..', 'assets', 'offline.html'), `
<html>
    <head>
        <title>Leap Blogger</title>
        <link rel="apple-touch-icon" href="/assets/img/favicon.ico">
        <link rel="apple-touch-startup-image" href="/assets/img/favicon.ico">
        <link type="image/x-icon" rel="apple-touch-icon-precomposed" href="/assets/img/favicon.ico">
        <link type="image/x-icon" rel="shortcut icon" href="/assets/img/favicon.ico">
        <link type="image/x-icon" rel="icon" href="/assets/img/favicon.ico">
        <link rel="canonical" href="https://leapfrog.app/">
        <link rel="manifest" href="/assets/manifest.json">
        <link rel="stylesheet" type="text/css" href="/assets/dist/public-app.css">
    </head>
    <body>
        <div id="public-app"></div>
        <script src="/assets/dist/public-app.js"></script>
    </body>
</html>
		`);
		fs.writeFileSync(path.join(__dirname, '..', '..', '..', '..', 'assets', 'sw.js'), `
/* eslint-disable */
// Version 0.6.2
let version = '0.6.2';
self.addEventListener('install', e => {
	e.waitUntil(
		caches.open('leapfrog').then((cache) => {
            return cache.addAll([
                '/',
                '/assets/sw.js?timestamp=${now}',
                '/assets/manifest.json?timestamp=${now}',
                '/assets/offline.html?timestamp=${now}',
                ${allFiles.join(',\n\t\t\t\t')}
            ])
            .then(() => self.skipWaiting());
		})
	);
});
self.addEventListener('fetch', (event) => {
	console.log('Fetch event for ', event.request.url);
	event.respondWith(
        caches.match(event.request, {ignoreSearch: true})
        .then((response) => {
			console.log('Network request for ', event.request.url);
			return response || fetch(event.request.url);
		})
	);
});
self.addEventListener('activate',  (event) => {
    console.log(self);
    console.log(event);
    event.waitUntil(self.clients.claim());
});
		`);
		return promise(300)
		.then(() => {
			return true;
		})
		.catch(() => {
			return true;
		});
	});
};
