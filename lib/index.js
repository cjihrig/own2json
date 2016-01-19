'use strict';

module.exports = function toJson () {
  var keys = Object.getOwnPropertyNames(this);
  var result = {};

  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i];

    result[key] = this[key];
  }

  return result;
};
