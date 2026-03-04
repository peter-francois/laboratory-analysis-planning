import { DateTime } from "luxon";
import { InputInterface } from "../types/interface/input.interface";
import { MetricsInterface } from "../types/interface/metrics.interface";
import { ScheduleInterface } from "../types/interface/schedule.interface";
import { shiftTimeByMinutes } from "../utils/time.utils";
import { orderSamples } from "./sample.service";
import { OutputInterface } from "../types/interface/output.interface";
import { timeString } from "../types/common.type";
import { assignSampleToResources } from "./planing.service";

export function planifyLab(data: InputInterface): OutputInterface {
  const { samples, technicians, equipment } = data;
  const orderedSamples = orderSamples(samples);
  const schedule: ScheduleInterface[] = [];
  const metrics: MetricsInterface = {
    totalTime: 0,
    efficiency: 0,
    conflicts: 0,
  };
  let firstStart: timeString | null = null;
  let lastEnd: timeString | null = null;
  let sumAnalysisTime: number = 0;

  for (const sample of orderedSamples) {
    const assignment = assignSampleToResources(sample, technicians, equipment, schedule);

    const sampleArrival = sample.arrivalTime;
    const sampleDuration = sample.analysisTime;
    if (!firstStart || DateTime.fromISO(sampleArrival) < DateTime.fromISO(firstStart)) {
      firstStart = sampleArrival;
    }
    if (!assignment) continue;
    schedule.push({
      sampleId: sample.id,
      technicianId: assignment.technicianId,
      equipmentId: assignment.equipmentId,
      startTime: assignment.startTime,
      endTime: assignment.endTime,
      priority: sample.priority,
    });

    sumAnalysisTime += sampleDuration;
    const sampleEnd = shiftTimeByMinutes(assignment.startTime, sampleDuration) as timeString;
    if (!lastEnd || DateTime.fromISO(sampleEnd) > DateTime.fromISO(lastEnd)) lastEnd = sampleEnd;
  }

  metrics.totalTime =
    firstStart && lastEnd
      ? DateTime.fromISO(lastEnd).diff(DateTime.fromISO(firstStart), "minutes").minutes
      : 0;
  metrics.efficiency = parseFloat(((sumAnalysisTime / metrics.totalTime) * 100).toFixed(1));

  return { schedule, metrics };
}
