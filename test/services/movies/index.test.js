'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('movies service', function() {
  it('registered the movies service', () => {
    assert.ok(app.service('movies'));
  });
});
