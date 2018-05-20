const randInt = (min = -Infinity, max = Infinity) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const randSign = () =>
  randInt(0, 2) === 1
  && 1
  || -1;

export default {
  randInt,
  randSign
};
