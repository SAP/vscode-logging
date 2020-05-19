const { format } = require("winston");
const { MESSAGE } = require("triple-beam");
const moment = require("moment-timezone");
// @ts-ignore
const { stableStringify } = require("fast-safe-stringify");

const utcTimestampProp = format(info => {
  // https://tools.ietf.org/html/rfc3339
  // With 3 fractional seconds and using space instead of "T" to separate the date and time.
  // -  The space separator is allowed by the specification.
  // -  https://tools.ietf.org/html/rfc3339#section-5.6 (bottom)
  const format = "YYYY-MM-DD HH:mm:ss.SSS[Z]";
  info.time = moment()
    .tz("Etc/UTC")
    .format(format);

  return info;
});

// TODO: stable json should be provided directly by winston / logForm (future versions).
const JSONStable = format(info => {
  info[MESSAGE] = stableStringify(info, null, 2);
  return info;
});

function buildLoggerFormat(label) {
  const resultFormat = format.combine(
    format.splat(),
    utcTimestampProp(),
    JSONStable()
  );
  return resultFormat;
}

module.exports = {
  buildLoggerFormat: buildLoggerFormat
};
