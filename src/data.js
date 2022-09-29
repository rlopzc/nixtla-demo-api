import _ from 'underscore';

export const stripeData = {
  timestamp: [ '2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01' ],
  value: [ 200, 290, 640, 550, 735]
};

export const parseNixtlaData = (nixtla) => {
  return {
    timestamp: nixtla['timestamp'],
    value: nixtla['value'],
  };
};