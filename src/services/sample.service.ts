import { DateTime } from "luxon";
import { SamplePriorityEnum } from "../types/enum/sample.enum";
import { SampleInterface } from "../types/interface/sample.interface";

const priorityRank: Record<SamplePriorityEnum, number> = {
  [SamplePriorityEnum.STAT]: 1,
  [SamplePriorityEnum.URGENT]: 2,
  [SamplePriorityEnum.ROUTINE]: 3,
};

export function orderSamples(samples: SampleInterface[]): SampleInterface[] {
  return samples.sort((a, b) => {
    // Sort by priority
    const priorityDiff = priorityRank[a.priority] - priorityRank[b.priority];
    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    // if same priority, sort by arrivalTime
    const timeA = DateTime.fromFormat(a.arrivalTime, "HH:mm");
    const timeB = DateTime.fromFormat(b.arrivalTime, "HH:mm");

    return timeA.toMillis() - timeB.toMillis();
  });
}
