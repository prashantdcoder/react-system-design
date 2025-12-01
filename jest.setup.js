import "@testing-library/jest-dom";
import fs from "fs";

import { TextEncoder, TextDecoder } from "util";

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}

if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder;
}

beforeAll(() => {
  const testFile = expect.getState().testPath;
  if (testFile) {
    const content = fs.readFileSync(testFile, "utf8");
    if (!content.includes('import React')) {
      throw new Error(`❌ Missing "import React" in test file: ${testFile}`);
    }
  }
});
