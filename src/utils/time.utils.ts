import { DateTime } from "luxon";
import { timeString } from "../types/common.type";

export function shiftTimeByMinutes(startTime: timeString, durationInMinutes: number): timeString {
  return DateTime.fromFormat(startTime, "HH:mm")
    .plus({
      minutes: durationInMinutes,
    })
    .toFormat("HH:mm") as timeString;
}
