var chai = require('chai');
chai.should();

var arrayMethods = require('../array-methods');

describe('Array Methods', function () {
  describe('hundredThousandairs', function () {
    it('should be an array with accounts from bankBalances that are greater than 100000', function () {
      arrayMethods.hundredThousandairs.should.have.length(93);
      arrayMethods.hundredThousandairs.every(function (account) { return account.amount > 100000; }).should.be.true;
    });
  });

  describe('sumOfBankBalances', function () {
    it('should be the sum of all amounts in bankBalances, rounded to the nearest dollar', function () {
      arrayMethods.sumOfBankBalances.should.be.equal(55502559);
    });
  });

  describe('sumOfInterests', function () {
    it('should be the sum the 18.9% interest for all amounts in bankBalances, in the selected states, rounded to the nearest dollar', function () {
      arrayMethods.sumOfInterests.should.be.equal(2504608);
    });
  });

  describe('stateSums', function () {
    it('should be a hash table', function () {
      chai.assert.isObject(arrayMethods.stateSums);
    });

    it('should have a key for each state', function () {
      let stateKeys = Object.keys(arrayMethods.stateSums);
      stateKeys.should.have.length(37);
      stateKeys.should.include.members(['ME', 'WI', 'ID', 'HI']);
    });

    it('should have a keys with values being the sum for each state, rounded to the nearest dollar', function () {
      arrayMethods.stateSums.ME.should.be.equal(2783816);
      arrayMethods.stateSums.WI.should.be.equal(2958667);
      arrayMethods.stateSums.ID.should.be.equal(461647);
      arrayMethods.stateSums.HI.should.be.equal(901770);
    });
  });

  describe('sumOfHighInterests', function () {
    it('should be the sum the 18.9% interest for all amounts in bankBalances, where the amount of the sum of interests in that state is greater than 50,000, in the selected states, rounded to the nearest dollar', function () {
      arrayMethods.sumOfHighInterests.should.be.equal(7985374);
    });
  });

  describe('lowerSumStates', function () {
    it('should be an Array', function () {
      chai.assert.isArray(arrayMethods.lowerSumStates);
    });

    it('should contain only abbreviations of states who have sums of amounts that are less than 1,000,000', function () {
      arrayMethods.lowerSumStates.should.have.same.members(['MI', 'MD', 'IN', 'CA', 'MS', 'MT', 'MO', 'KY', 'AK', 'HI', 'ID']);
    });
  });

  describe('higherStateSums', function () {
    it('should be the sum of all amounts of every state, where the sum of amounts in the state is greater than 1,000,000', function () {
      arrayMethods.higherStateSums.should.be.equal(48629843);
    });
  });

  describe('areStatesInHigherStateSum should be true if all of these states have a sum of account values greater than 2,550,000', function () {
    it('should be the sum of all amounts of every state, where the sum of amounts in the state is greater than 1,000,000', function () {
      arrayMethods.areStatesInHigherStateSum.should.be.false;
    });
  });

  describe('anyStatesInHigherStateSum should be true if any of these states have a sum of account values greater than 2,550,000', function () {
    it('should be the sum of all amounts of every state, where the sum of amounts in the state is greater than 1,000,000', function () {
      arrayMethods.anyStatesInHigherStateSum.should.be.true;
    });
  });
});
