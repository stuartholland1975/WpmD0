/** @format */

import numeral from 'numeral';
import {DateTime} from 'luxon';

export const formatNumberGridNoDecimals = (number) =>
	numeral(number.value).format('0,0');

export const formatNumberGridTwoDecimals = (number) =>
	numeral(number.value).format('0,0.00');

export const formatNumberNoDecimals = (number) => numeral(number).format('0,0');

export const formatNumberTwoDecimals = (number) =>
	numeral(number).format('0,0.00');

export const formatDate = (date) => {
	const converted = DateTime.fromISO(date);
	const isValid = DateTime.isDateTime(converted);
	if (isValid)
		return converted.setLocale('en-GB').toLocaleString(DateTime.DATE_SHORT);
};

export function divideIfNotZero(numerator, denominator) {
	if (denominator === 0 || isNaN(denominator)) {
		return null;
	} else {
		return numerator / denominator;
	}
}

export const numberOnly = (event) => {
	return (
		event.key === '1' ||
		event.key === '2' ||
		event.key === '3' ||
		event.key === '4' ||
		event.key === '5' ||
		event.key === '6' ||
		event.key === '7' ||
		event.key === '8' ||
		event.key === '9' ||
		event.key === '0' ||
		event.key === '.'
	);
};

export const camelCaseToText = (str) =>
	str.replace(/^[a-z]|[A-Z]/g, (c, i) => (i ? ' ' : '') + c.toUpperCase());

export const truncateString = (str, len) => {
	if (str.length > len) {
		if (len <= 3) {
			return str.slice(0, len - 3) + '...';
		} else {
			return str.slice(0, len) + '...';
		}
	} else {
		return str;
	}
};
