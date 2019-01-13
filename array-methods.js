"use strict";

var dataset = require('./dataset.json');
let bankBalances = dataset.bankBalances;
/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = bankBalances.filter(account => account.amount > 100000);


// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = bankBalances.reduce((amount, previousValue) => {
  return amount + parseInt(previousValue.amount);
}, 0);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */

var sumOfInterests = bankBalances.filter(account => {
  return ['WI', 'WY', 'IL', 'OH', 'GA', 'DE'].includes(account.state);
})
  .map((account) => {
    return Math.round(account.amount * 0.189);
  })
  .reduce((interests, previousValue) => {
    return interests + previousValue;
  }, 0);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest dollar

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
var stateSums = bankBalances.reduce((account, current) => {
  let state = current.state;
  let amount = Math.round(parseInt(current.amount));
  if (account.hasOwnProperty(state)) {
    account[state] += Math.round(amount);
  } else {
    account[state] = Math.round(amount);
  }
  return account;
}, {});

/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */

var sumOfHighInterests = bankBalances.reduce((states, account) => {
  if (!['WI', 'WY', 'IL', 'OH', 'GA', 'DE'].includes(account.state)) {
    if (!states.includes(account.state)) {
      states.push(account.state);
    }
  }

  return states;
}, [])
  .reduce((sum, state) => {
    let sumInterest = Math.round(stateSums[state] * 0.189);

    if (sumInterest > 50000) {
      sum += sumInterest;
    }

    return sum;
  }, 0);

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = bankBalances.reduce((states, account) => {
  let state = account.state;

  if (!states.includes(state)) {
    states.push(state);
  }

  return states;
}, [])
  .filter(state => { return stateSums[state] < 1000000 });



/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = bankBalances.reduce((states, account) => {
  let state = account.state;

  if (!states.includes(state)) {
    states.push(state);
  }

  return states;
}, [])
  .reduce((sum, current) => {
    if (stateSums[current] > 1000000) {
      return sum + stateSums[current];
    } else {
      return sum;
    }
  }, 0);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = ['WI', 'WY', 'IL', 'OH', 'GA', 'DE'].every(state => {
  return stateSums[state] > 2550000
});

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = ['WI', 'WY', 'IL', 'OH', 'GA', 'DE'].some(state => {
  return stateSums[state] > 2550000
});


module.exports = {
  hundredThousandairs: hundredThousandairs,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};
