'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('genres service', function() {
  it('registered the genres service', () => {
    assert.ok(app.service('genres'));
  });
});
