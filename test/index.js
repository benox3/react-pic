'use strict';

/**
 * Module dependencies.
 */
var assert = require('assert');

/**
 * Test suite.
 */
describe('main', function() {

  it('should respond with placeholder', function() {
    assert.equal(require('../index'), 'npm-package-template');
  });

});
