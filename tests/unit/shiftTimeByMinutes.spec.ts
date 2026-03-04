import { shiftTimeByMinutes } from "../../src/utils/time.utils";

describe("shiftTimeByMinutes test", () => {
  it("should add minutes to a given time", () => {
    expect(shiftTimeByMinutes("10:00", 30)).toBe("10:30");
  });
  it("shoul handle overflow", () => {
    expect(shiftTimeByMinutes("10:30", 45)).toBe("11:15");
  });
});
