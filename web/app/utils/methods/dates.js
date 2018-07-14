import moment from 'moment';

export function monthAway(date, direction) {
	return moment(date).add(direction, 'months');
}

export function yearAway(date, direction) {
	return moment(date).add(direction, 'years');
}
