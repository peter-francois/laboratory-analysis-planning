import * as path from "path";
import { readFileSync } from "fs";
import { planifyLab } from "../../src/services/schedule.service";
import { BASE_DIR } from "../../src/config/path";

const singleSamplePath = path.join(BASE_DIR, "./tests/integration/input/single-sample.json");
const expectedFilePath = path.join(
  BASE_DIR,
  "./tests/integration/expected/single-sample-output.json",
);

describe("Single sample test", () => {
  it("Should match expected output", () => {
    const input = JSON.parse(readFileSync(singleSamplePath, "utf-8"));
    const expected = JSON.parse(readFileSync(expectedFilePath, "utf-8"));

    const output = planifyLab(input);
    expect(output).toEqual(expected);
  });
});
