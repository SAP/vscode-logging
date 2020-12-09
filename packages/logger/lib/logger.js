const { forEach, findKey } = require("lodash");
const stacktrace = require("stacktrace-js");
const { levelsConfig, isValidLogLevel } = require("./levels");
const ADD_SOURCE_LOCATION_INFO = Symbol("addSourceLocationInfo");
const CHANGE_LEVEL = Symbol("changeLevel");
const CHANGE_SOURCE_LOCATION_TRACKING = Symbol("changeSourceLocationTracking");

const LABEL = Symbol("label");
const LOGGER_IMPEL = Symbol("loggerImpel");
const LEVEL_INT = Symbol("levelInt");
const SOURCE_LOCATION_TRACKING = Symbol("sourceLocationTracking");
const CONSOLE_OUTPUT = Symbol("consoleOutput");
const CHILD_LOGGERS = Symbol("childLoggers");
const OUT_CHANNEL = Symbol("outChannel");
const WARN_IF_LOCATION_TRACKING_IS_ENABLED = Symbol(
  "warnIfLocationTrackingIsEnabled"
);

class BaseLogger {
  /**
   * @param {object} opts
   * @param {string} opts.label
   * @param {string} opts.level
   * @param {boolean} [opts.sourceLocationTracking]
   * @param {boolean} [opts.consoleOutput]
   * @param {import("winston").Logger} opts.loggerImpel
   */
  constructor(opts) {
    this[LABEL] = opts.label;
    this[LOGGER_IMPEL] = opts.loggerImpel;
    this[LEVEL_INT] = levelsConfig[opts.level];
    // disabled by default as this may cause performance regressions
    this[SOURCE_LOCATION_TRACKING] = opts.sourceLocationTracking || false;
    this[CONSOLE_OUTPUT] = opts.consoleOutput || false;
    // Possible memory leak if users forget to release their childLogger Resources
    // Could have been resolved using WeakMap, however Weak Collections in JavaScript are not iterable (yet)
    // So they are insufficient for our needs (see `getChildLogger` method).
    // - https://github.com/tc39/proposal-weakrefs#iterable-weakmaps
    this[CHILD_LOGGERS] = new Map([]);
  }

  getChildLogger(opts) {
    const newLabel = this[LABEL] + "." + opts.label;

    if (this[CHILD_LOGGERS].has(newLabel)) {
      return this[CHILD_LOGGERS].get(newLabel);
    }

    const newChildLoggerImpel = new BaseLogger({
      label: newLabel,
      sourceLocationTracking: this[SOURCE_LOCATION_TRACKING],
      consoleOutput: this[CONSOLE_OUTPUT],
      level: findKey(levelsConfig, val => val === this[LEVEL_INT]),
      loggerImpel: this[LOGGER_IMPEL]
    });

    this[CHILD_LOGGERS].set(newLabel, newChildLoggerImpel);

    return newChildLoggerImpel;
  }

  fatal(msg, ...args) {
    if (this[LEVEL_INT] >= levelsConfig.fatal) {
      this[ADD_SOURCE_LOCATION_INFO](args);
      args.push({ label: this[LABEL] });
      // @ts-ignore
      this[LOGGER_IMPEL].fatal(msg, ...args);
    }
  }

  error(msg, ...args) {
    if (this[LEVEL_INT] >= levelsConfig.error) {
      this[ADD_SOURCE_LOCATION_INFO](args);
      args.push({ label: this[LABEL] });
      this[LOGGER_IMPEL].error(msg, ...args);
    }
  }

  warn(msg, ...args) {
    if (this[LEVEL_INT] >= levelsConfig.warn) {
      this[ADD_SOURCE_LOCATION_INFO](args);
      args.push({ label: this[LABEL] });
      this[LOGGER_IMPEL].warn(msg, ...args);
    }
  }

  info(msg, ...args) {
    if (this[LEVEL_INT] >= levelsConfig.info) {
      this[ADD_SOURCE_LOCATION_INFO](args);
      args.push({ label: this[LABEL] });
      this[LOGGER_IMPEL].info(msg, ...args);
    }
  }

  debug(msg, ...args) {
    if (this[LEVEL_INT] >= levelsConfig.debug) {
      this[ADD_SOURCE_LOCATION_INFO](args);
      args.push({ label: this[LABEL] });
      this[LOGGER_IMPEL].debug(msg, ...args);
    }
  }

  trace(msg, ...args) {
    if (this[LEVEL_INT] >= levelsConfig.trace) {
      this[ADD_SOURCE_LOCATION_INFO](args);
      args.push({ label: this[LABEL] });
      // @ts-ignore
      this[LOGGER_IMPEL].trace(msg, ...args);
    }
  }
}

// private methods using Symbols to hide it, need to be added directly on the prototype
BaseLogger.prototype[CHANGE_LEVEL] = function(newLevel) {
  this[LEVEL_INT] = levelsConfig[newLevel];
  // @ts-ignore
  forEach([...this[CHILD_LOGGERS].values()], childLogger => {
    // Recursive Call
    childLogger[CHANGE_LEVEL](newLevel);
  });
};

// private methods using Symbols to hide it, need to be added directly on the prototype
BaseLogger.prototype[CHANGE_SOURCE_LOCATION_TRACKING] = function(
  isSourceLocTrack
) {
  this[SOURCE_LOCATION_TRACKING] = isSourceLocTrack;
  // @ts-ignore
  forEach([...this[CHILD_LOGGERS].values()], childLogger => {
    // Recursive Call
    childLogger[CHANGE_SOURCE_LOCATION_TRACKING](isSourceLocTrack);
  });
};

BaseLogger.prototype[ADD_SOURCE_LOCATION_INFO] = function(args) {
  if (this[SOURCE_LOCATION_TRACKING] === true) {
    const stack = stacktrace.getSync();
    // we need to go 2 levels up the stack to get to the end user's code
    const userFrame = stack[2];
    const sourceLocMsg = `${userFrame.fileName}:${userFrame.lineNumber}:${userFrame.columnNumber}`;
    // Balance between reducing number of properties and readability
    args.push({
      source: {
        function: userFrame.functionName,
        location: sourceLocMsg
      }
    });
  }
};

class VSCodeExtLogger extends BaseLogger {
  /**
   * @param {object} opts
   * @param {string} opts.label
   * @param {string} opts.level
   * @param {import("winston").Logger} opts.loggerImpel
   * @param {import("../api").BasicOutputChannel} [opts.outChannel]
   * @param {boolean} [opts.sourceLocationTracking]
   * @param {boolean} [opts.consoleOutput]
   */
  constructor(opts) {
    super(opts);

    this[OUT_CHANNEL] = opts.outChannel || undefined;
    this.changeLevel(opts.level);
    this[WARN_IF_LOCATION_TRACKING_IS_ENABLED]();
  }

  changeLevel(newLevel) {
    if (isValidLogLevel(newLevel) === false) {
      this.fatal(
        `Attempt to use unknown logging level: <${newLevel}> has been ignored.`
      );
    } else {
      // A strange kind of `super.changeLevel` call
      this[CHANGE_LEVEL](newLevel);
    }
  }

  changeSourceLocationTracking(newSourceLocation) {
    this[CHANGE_SOURCE_LOCATION_TRACKING](newSourceLocation);
    this[WARN_IF_LOCATION_TRACKING_IS_ENABLED]();
  }
}

// private method using Symbols to hide it, need to be added directly on the prototype
VSCodeExtLogger.prototype[WARN_IF_LOCATION_TRACKING_IS_ENABLED] = function() {
  if (this[SOURCE_LOCATION_TRACKING] === true) {
    this.fatal(
      "SourceLocationTracking is Enabled, This must only be used during debugging flows as it causes performance regressions"
    );

    if (this[OUT_CHANNEL]) {
      this[OUT_CHANNEL].show();
    }
  }
};

module.exports = {
  VSCodeExtLogger: VSCodeExtLogger
};
