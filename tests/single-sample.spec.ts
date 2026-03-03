import * as path from "path";
import { BASE_DIR, DEFAULT_INPUT_TEST_DIR } from "../src/config/path";
import { readFileSync } from "fs";
import { planifyLab } from "../src/services/schedule.service";

const singleSamplePath = path.join(DEFAULT_INPUT_TEST_DIR, "./single-sample.json");
const expectedFilePath = path.join(BASE_DIR, "./tests/expected/single-sample-output.json");

describe("Single sample test", () => {
  it("Should match expected output", () => {
    const input = JSON.parse(readFileSync(singleSamplePath, "utf-8"));
    const expected = JSON.parse(readFileSync(expectedFilePath, "utf-8"));

    const output = planifyLab(input);
    expect(output).toEqual(expected);
  });
});
