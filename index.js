"use strict";

const co = require("co");

function getMultiAsyncJobs() {
    return co(function * () {
	let result_1 = yield AsyncOne();
	let result_2 = yield AsyncTwo();
	return new Promise(function(resolve, reject) {
	    if(!!result_1 && !!result_2) {
		resolve(`${result_1} and ${result_2}`);
	    } else {
		reject('async one or/and two failed');
	    }
	});
    });
}

function AsyncOne() {
    return new Promise(function(resolve, reject) {
	let value = Math.random();
	setTimeout(function() {
	    if(value < .5) {
		resolve(value);
	    } else {
		reject(value);
	    }
	}, 2000);
    }).catch(function(err) { throw(`async one failed ${err}`); });
}

function AsyncTwo() {
    return new Promise(function(resolve, reject) {
	let value = Math.random();
	setTimeout(function() {
	    if(value < .5) {
		resolve(value);
	    } else {
		reject(value);
	    }
	}, 2000);
    }).catch(function(err) { throw(`async two failed ${err}`); });
}

getMultiAsyncJobs().then(function(results) {
    console.log(`success ${results}`);
}).catch(function(err) {
    console.error(err);
});
