const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 180, checkperiod: 30 });

module.exports = cache;
