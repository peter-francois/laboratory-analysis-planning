import * as path from "path";
import { SampleInterface } from "../../src/types/interface/sample.interface";
import { BASE_DIR } from "../../src/config/path";
import { readFileSync } from "fs";
import { orderSamples } from "../../src/services/sample.service";

const orderSamplePath = path.join(BASE_DIR, "./tests/unit/input/order-sample.json");
const expectedFilePath = path.join(BASE_DIR, "./tests/unit/expected/order-sample-output.json");

describe("orderSample test", () => {
  it("should sort samples correctly by priority and arrivalTime", () => {
    const samples: SampleInterface[] = JSON.parse(readFileSync(orderSamplePath, "utf-8"));
    const expected = JSON.parse(readFileSync(expectedFilePath, "utf-8"));

    const output = orderSamples(samples);

    expect(output).toStrictEqual(expected);
  });
});
