const { meanFinder, medianFinder, modeFinder } = require('./app');

describe('testing mean, medium and mode calculations', function () {
	test('testing mean calculation', () => {
		const arr = meanFinder([1, 2, 3]);
		expect(arr).toEqual(2);
		const arr2 = meanFinder([1, -2, 3, 4]);
		expect(arr2).toEqual(1.5);
	});

	test('testing medium calculation', () => {
		const arr = medianFinder([3, 4, 5]);
		expect(arr).toEqual(4);
		const arr2 = medianFinder([-2, 1, 3, 4]);
		expect(arr2).toEqual(2);
	});

	test('testing mode calculation', () => {
		const arr = modeFinder([1, 2, 3, 3]);
		expect(arr).toEqual(3);
		const arr2 = modeFinder([-1, -1, 2, 2]);
		expect(arr2).toEqual(-1);
	});
});
