module.exports = {
  convertCtoF: function(c) {
    let ret = c * 9 / 5 + 32;
    let ret2 = Math.round(ret * 100) / 100;
    return Math.round(ret2 * 10) / 10;
  },

  convertFtoC: function(f) {
    let ret = (f - 32) * 5 / 9;
    let ret2 = Math.round(ret * 100) / 100;
    return Math.round(ret2 * 10) / 10;
  }
};
