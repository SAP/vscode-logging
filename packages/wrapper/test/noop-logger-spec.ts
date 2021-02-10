import { expect } from "chai";
import { keys, difference, forEach } from "lodash";
import { noop, NOOP_LOGGER } from "../src/noop-logger";

describe("The no-operation logger", () => {
  const noopFuncProps = difference(keys(NOOP_LOGGER), ["getChildLogger"]);

  forEach(noopFuncProps, funcPropName => {
    it(`exposes a no operation method for <${funcPropName}>`, () => {
      // @ts-expect-error -- runtime reflection
      expect(NOOP_LOGGER[funcPropName]).to.eql(noop);
    });
  });

  it("uses an **empty** method for the noop implementation", () => {
    const noopSource = noop.toString();
    //
    // The `cov_...` section in optional capturing group handles the case of execution under nyc wrapper
    //   - instrumented code, in which case `toString` would return something like:
    //   ```
    //      function noop(){cov_1w547p8w8s().f[0]++;}'
    //   ```
    expect(noopSource).to.match(
      /function\s*\w+\s*\(\s*\)\s*{\s*(cov_\w+\(\)\.f\[\d]\+\+;)?}/
    );
  });

  it("will not throw when executing the NOOP function", () => {
    expect(noop()).to.not.throw;
  });

  it("implements <getChildLogger> by returning 'itself'", () => {
    expect(NOOP_LOGGER.getChildLogger({ label: "foo" })).to.equal(NOOP_LOGGER);
  });
});
