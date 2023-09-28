const timeTypeRegexp = /^[1-9]\d*:[0-5]\d$|^0:[0-5]\d$/;

/**
 * Checks if a time is valid or not
 * @param {string} format
 * @returns {boolean}
 */
function isTimeFormat(format) {
  return timeTypeRegexp.test(format);
}

module.exports = { isTimeFormat };
