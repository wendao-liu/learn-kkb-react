let ex = require('./lib/cjs');
console.log(888888)
try {
  const umiExports = require('@@/core/umiExports');
  ex = Object.assign(ex, umiExports);
} catch (e) {}
module.exports = ex;
