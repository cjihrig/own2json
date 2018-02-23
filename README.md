# own2json

[![Current Version](https://img.shields.io/npm/v/own2json.svg)](https://www.npmjs.org/package/own2json)
[![Build Status via Travis CI](https://travis-ci.org/continuationlabs/own2json.svg?branch=master)](https://travis-ci.org/continuationlabs/own2json)
![Dependencies](http://img.shields.io/david/continuationlabs/own2json.svg)
[![belly-button-style](https://img.shields.io/badge/eslint-bellybutton-4B32C3.svg)](https://github.com/continuationlabs/belly-button)


Stringify objects' own properties.

## The Problem

Some objects (read `Error`s) don't stringify the way you'd like them to:

```javascript
const err = new Error('foo');

console.log(JSON.stringify(err));
// Logs {}
```

### The Solution

`own2json` exports a single method, which can be used as an object's `toJSON()` method. The result is that `JSON.stringify()` will contain all of the properties returned by `Object.getOwnPropertyNames()` that can be stringified (`undefined`, functions, etc. will not be included).

```javascript
const Own2Json = require('own2json');
const err = new Error('foo');

e2.toJSON = Own2Json;
console.log(JSON.stringify(err));
// Value contains error's `message` and `stack`
// Only applies to `e2`
```

This technique can be applied to prototypes as well (although modifying builtins is not recommended):

```javascript
const Own2Json = require('own2json');
const err = new Error('foo');

Error.prototype.toJSON = Own2Json;
console.log(JSON.stringify(err));
// Value contains error's `message` and `stack`
// Applies to all Error objects
```
