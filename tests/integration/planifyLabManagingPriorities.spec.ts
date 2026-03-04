import * as path from "path";
import { readFileSync } from "fs";
import { planifyLab } from "../../src/services/schedule.service";
import { BASE_DIR } from "../../src/config/path";

const singleSamplePath = path.join(BASE_DIR, "./tests/integration/input/managing-priorities.json");
const expectedFilePath = path.join(
  BASE_DIR,
  "./tests/integration/expected/managing-priorities-output.json",
);
console.log("🚀 ~ planifyLabManagingPriorities.spec.ts:11 ~ expectedFilePath:", expectedFilePath)

describe("Managing priorities test", () => {
  it("Should match expected output for managing priorities test", () => {
    const input = JSON.parse(readFileSync(singleSamplePath, "utf-8"));
    const expected = JSON.parse(readFileSync(expectedFilePath, "utf-8"));

    const output = planifyLab(input);
    expect(output).toEqual(expected);
  });
});
