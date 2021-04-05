export const normalize = (min, max) => {
  const delta = max - min;
  return function (val) {
    return (val - min) / delta;
  };
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
