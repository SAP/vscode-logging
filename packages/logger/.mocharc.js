const chai = require("chai");
const chaiExclude = require("chai-exclude");

chai.use(chaiExclude);

module.exports = {
  // If coverage is enabled each test takes quite a while
  timeout: 5000
};
