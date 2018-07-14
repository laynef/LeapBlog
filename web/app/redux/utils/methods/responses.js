import { kebabCase } from 'lodash';

export function formatWithCount(response, cb) {
	return response.data.reduce((acc, item, index, array) => {
		return cb(acc, item, index, array);
	}, { count: Number(response.count), dictionary: {}, array: [] });
}

export function formatWithObject(response, prop='id') {
	let dict = {};
	dict[response[prop]] = response;
	return { array: [response], dictionary: dict, count: 1 };
}

export function formatWithSingleObject(response, prop='id', lookUpKey='thread_id') {
	let dictionary = {};
	dictionary[response[prop]] = response;
	let lookUp = {};
	lookUp[response[lookUpKey]] = [response];
	return { array: [response], dictionary: dictionary, count: 1, lookUpArray: lookUp };
}
