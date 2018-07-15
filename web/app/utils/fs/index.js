const fileNames = [
	'createServiceWorker',
	'getFilePathNames',
	'makeHash',
];

const allMethods = fileNames.reduce((acc, item) => {
    const object = {};
    object[item] = require(`./methods/${item}`);
	return { ...acc, ...object };
}, {});

module.exports = allMethods;
