const chai = require('chai');

// Make sure chai and jasmine ".not" play nice together
/* istanbul ignore next */
const originalNot = Object.getOwnPropertyDescriptor(
  chai.Assertion.prototype,
  'not',
).get;

/* istanbul ignore next */
Object.defineProperty(chai.Assertion.prototype, 'not', {
  get() {
    Object.assign(this, this.assignedNot);

    return originalNot.apply(this);
  },
  set(newNot) {
    /* istanbul ignore next */
    this.assignedNot = newNot;

    /* istanbul ignore next */
    return newNot;
  },
});

// Combine both jest and chai matchers on expect
const originalExpect = global.expect;

global.expect = (actual) => {
  const originalMatchers = originalExpect(actual);
  const chaiMatchers = chai.expect(actual);
  const combinedMatchers = Object.assign(chaiMatchers, {
    toMatchSnapshot: originalMatchers.toMatchSnapshot,
  });

  return combinedMatchers;
};
