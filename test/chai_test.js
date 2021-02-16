//used an example to demonstarte testing with chai - Howard Montes De Oca
"use strict";

var expect = require('chai').expect;

describe('Math', function() {
	    describe('#abs()', function() {
		            it('should return positive value of given negative number', function() {
				                expect(Math.abs(-5)).to.be.equal(5);
				            });
		        });
});

describe('ZIP Code', function() {
	var zip = 91210
	it('should be a zip code or a city', function() {
		expect(zip).to.satisfy((n) => n > 0 && n < 99999)
	});
});