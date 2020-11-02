const { format } = require("winston");
const { MESSAGE } = require("triple-beam");
// @ts-ignore
const { stableStringify } = require("fast-safe-stringify");

const utcTimestampProp = format(info => {
  // The timestamp format is according to ISO-8601 and the format is: YYYY-MM-DDTHH:mm:ss.sssZ
  info.time = new Date().toISOString();

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
