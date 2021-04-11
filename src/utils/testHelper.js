export const findTestWrapper = (wrapper, attr) => {
  return wrapper.find(`[data-test="${attr}"]`);
};
