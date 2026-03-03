import { SamplePriorityEnum } from "../types/enum/sample.enum";
import { SampleInterface } from "../types/interface/sample.interface";

const priorityRank: Record<SamplePriorityEnum, number> = {
  [SamplePriorityEnum.STAT]: 1,
  [SamplePriorityEnum.URGENT]: 2,
  [SamplePriorityEnum.ROUTINE]: 3,
};

export function orderSamples(samples: SampleInterface[]): SampleInterface[] {
  return samples.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
}
