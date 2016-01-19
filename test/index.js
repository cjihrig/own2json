'use strict';
const Code = require('code');
const Lab = require('lab');
const Own2Json = require('../');

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;


describe('own2json', () => {
  describe('#toJson()', () => {
    it('stringifies all own properties of an object', (done) => {
      const e1 = new Error('foo');
      const e2 = new Error('bar');

      e2.toJSON = Own2Json;

      const o1 = JSON.parse(JSON.stringify(e1));
      const o2 = JSON.parse(JSON.stringify(e2));
      const k1 = Object.getOwnPropertyNames(o1);
      const k2 = Object.getOwnPropertyNames(o2);

      expect(k1).to.be.an.array().and.have.length(0);
      expect(k2).to.be.an.array().and.include(['message', 'stack']);
      expect(o1.message).to.not.exist();
      expect(o2.message).to.equal('bar');
      done();
    });

    it('can be applied to an object\'s prototype', (done) => {
      /* eslint-disable no-extend-native */
      const err = new Error('foo');
      const original = Error.prototype.toJSON;
      const r1 = Object.getOwnPropertyNames(JSON.parse(JSON.stringify(err)));

      expect(r1).to.be.an.array().and.have.length(0);

      Error.prototype.toJSON = Own2Json;
      const r2 = Object.getOwnPropertyNames(JSON.parse(JSON.stringify(err)));
      expect(r2).to.be.an.array().and.include(['message', 'stack']);

      Error.prototype.toJSON = original;
      const r3 = Object.getOwnPropertyNames(JSON.parse(JSON.stringify(err)));
      expect(r3).to.be.an.array().and.have.length(0);
      done();
      /* eslint-enable no-extend-native */
    });
  });
});
