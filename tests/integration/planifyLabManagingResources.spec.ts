import * as path from "path";
import { readFileSync } from "fs";
import { planifyLab } from "../../src/services/schedule.service";
import { BASE_DIR } from "../../src/config/path";

const singleSamplePath = path.join(BASE_DIR, "./tests/integration/input/managing-resources.json");
const expectedFilePath = path.join(
  BASE_DIR,
  "./tests/integration/expected/managing-resources-output.json",
);

describe("Managing resources test", () => {
  it("Should match the expected output for resource management", () => {
    const input = JSON.parse(readFileSync(singleSamplePath, "utf-8"));
    const expected = JSON.parse(readFileSync(expectedFilePath, "utf-8"));

    const output = planifyLab(input);
    expect(output).toEqual(expected);
  });
});
