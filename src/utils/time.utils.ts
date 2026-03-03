import { DateTime } from "luxon";
import { ISOTimeString } from "../types/common.type";

export function shiftTimeByMinutes(startTime: ISOTimeString, durationInMinutes: number) {
  return DateTime.fromFormat(startTime, "HH:mm")
    .plus({
      minutes: durationInMinutes,
    })
    .toFormat("HH:mm");
}
