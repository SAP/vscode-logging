const { partial, mapValues, includes, keys } = require("lodash");

const levelsConfig = {
  off: -1,
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5
};

const logLevelsKeys = mapValues(levelsConfig, (val, key) => key);

const isValidLogLevel = partial(includes, keys(levelsConfig));

module.exports = {
  levelsConfig: levelsConfig,
  levels: logLevelsKeys,
  isValidLogLevel: isValidLogLevel
};
