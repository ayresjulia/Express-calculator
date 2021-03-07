const express = require('express');
const ExpressError = require('./expressError');

const app = express();

app.use(express.json());

// MEAN function and route

function meanFinder(arr) {
	let mean = 0;
	for (let i = 0; i < arr.length; i++) {
		mean += arr[i];
	}
	return mean / arr.length;
}

app.get('/mean', (req, res, next) => {
	try {
		const { nums } = req.query;
		if (nums.length < 1) throw new ExpressError(`ERROR: nums are required`, 400);
		let arr = [];
		nums.split`,`.map(x => {
			if (isNaN(x)) throw new ExpressError(`ERROR: ${x} is not a number`, 400);
			arr.push(+x);
		});
		res.send({ response: { operation: 'mean', value: meanFinder(arr) } });
	} catch (e) {
		next(e);
	}
});

// MEDIAN function and route

function medianFinder(arr) {
	let half = Math.floor(arr.length / 2);
	if (arr.length % 2 === 0) {
		return (arr[half] + arr[half - 1]) / 2;
	} else {
		return (arr[half - 1] + arr[half + 1]) / 2;
	}
}

app.get('/median', (req, res, next) => {
	try {
		const { nums } = req.query;
		if (nums.length < 1) throw new ExpressError(`ERROR: nums are required`, 400);
		let arr = [];
		nums.split`,`.map(x => {
			if (isNaN(x)) throw new ExpressError(`ERROR: ${x} is not a number`, 400);
			arr.push(+x);
			arr.sort(function (a, b) {
				return a - b;
			});
		});
		res.send({ response: { operation: 'median', value: medianFinder(arr) } });
	} catch (e) {
		next(e);
	}
});

// MODE function and route

function modeFinder(arr) {
	let mode = {};
	let max = 0;
	let count = 0;

	arr.forEach(function (e) {
		if (mode[e]) {
			mode[e]++;
		} else {
			mode[e] = 1;
		}

		if (count < mode[e]) {
			max = e;
			count = mode[e];
		}
	});
	return max;
}

app.get('/mode', (req, res, next) => {
	try {
		const { nums } = req.query;
		if (nums.length < 1) throw new ExpressError(`ERROR: nums are required`, 400);
		let arr = [];
		nums.split`,`.map(x => {
			if (isNaN(x)) throw new ExpressError(`ERROR: ${x} is not a number`, 400);
			arr.push(+x);
			arr.sort(function (a, b) {
				return a - b;
			});
		});
		res.send({ response: { operation: 'mode', value: modeFinder(arr) } });
	} catch (e) {
		next(e);
	}
});

// this will run if none of the routes above were called
app.use((req, res, next) => {
	const e = new ExpressError('ERORR: Page Not Found', 404);
	next(e);
});

app.use((error, req, res, next) => {
	let status = error.status || 500; //default error status
	let msg = error.msg;
	res.status(status).send(msg);
});

app.listen(3000, () => {
	console.log('Server running on port 3000');
});

module.exports = { meanFinder, medianFinder, modeFinder };
