import getColorByMood from './getColorByMood';

const unhappy = {
  happy: 0,
  dead: 10,
  thinking: 10,
  coffee: 0,
  slowDown: 0,
  question: 0,
};
const happy = {
  happy: 20,
  dead: 0,
  thinking: 0,
  coffee: 0,
  slowDown: 0,
  question: 0,
};
const almostUnhappy = {
  happy: 0,
  dead: 10,
  thinking: 6,
  coffee: 0,
  slowDown: 0,
  question: 0,
};
const almostHappy = {
  happy: 0,
  dead: 5,
  thinking: 6,
  coffee: 0,
  slowDown: 0,
  question: 0,
};

describe('getColorByMood', () => {
  it('returns red color', () => {
    expect(getColorByMood(unhappy, 25)).toEqual('rgba(235, 0, 0, 0.7)');
  });
  it('returns orange color', () => {
    expect(getColorByMood(almostUnhappy, 25)).toEqual('rgba(230, 147, 5, 0.7)');
  });
  it('returns yellow color', () => {
    expect(getColorByMood(almostHappy, 25)).toEqual('rgba(255, 249, 61, 0.7)');
  });
  it('returns green color', () => {
    expect(getColorByMood(happy, 25)).toEqual('rgba(148, 234, 72, 0.7)');
  });
});
