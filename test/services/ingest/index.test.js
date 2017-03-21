'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('ingest service', function() {
  it('registered the ingests service', () => {
    assert.ok(app.service('ingests'));
  });
});
