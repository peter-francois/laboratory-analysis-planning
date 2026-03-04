import { DateTime } from "luxon";
import { InputInterface } from "../types/interface/input.interface";
import { MetricsInterface } from "../types/interface/metrics.interface";
import { ScheduleInterface } from "../types/interface/schedule.interface";
import { shiftTimeByMinutes } from "../utils/time.utils";
import { orderSamples } from "./sample.service";
import { OutputInterface } from "../types/interface/output.interface";
import { TechnicianSpecialityEnum } from "../types/enum/technician.enum";
import { isResourceAvailable } from "./resource.service";
import { timeString } from "../types/common.type";

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
    let assigned = false;
    const sampleArrival = sample.arrivalTime;
    const sampleDuration = sample.analysisTime;
    let currentStartTime = sampleArrival;
    if (!firstStart || DateTime.fromISO(sampleArrival) < DateTime.fromISO(firstStart)) {
      firstStart = sampleArrival;
    }

    for (const technician of technicians) {
      if (assigned) break;
      if (
        (technician.speciality as string) !== (sample.type as string) &&
        technician.speciality !== TechnicianSpecialityEnum.GENERAL
      )
        continue;
      const techStart = DateTime.fromISO(technician.startTime);
      const techEnd = DateTime.fromISO(technician.endTime);

      currentStartTime = DateTime.max(DateTime.fromISO(sampleArrival), techStart).toFormat(
        "HH:mm",
      ) as timeString;

      let currentEndTime = shiftTimeByMinutes(currentStartTime, sampleDuration);
      if (DateTime.fromISO(currentEndTime) > techEnd) {
        continue;
      }

      for (const equip of equipment) {
        if ((equip.type as string) !== (sample.type as string)) continue;

        while (
          (!isResourceAvailable(
            schedule,
            technician,
            currentStartTime,
            currentEndTime,
            "technician",
          ) ||
            !isResourceAvailable(schedule, equip, currentStartTime, currentEndTime, "equipment")) &&
          DateTime.fromISO(currentEndTime) <= techEnd
        ) {
          currentStartTime = shiftTimeByMinutes(currentStartTime, 1);
          currentEndTime = shiftTimeByMinutes(currentStartTime, sampleDuration);
        }

        if (
          isResourceAvailable(
            schedule,
            technician,
            currentStartTime,
            currentEndTime,
            "technician",
          ) &&
          isResourceAvailable(schedule, equip, currentStartTime, currentEndTime, "equipment") &&
          DateTime.fromISO(currentEndTime) <= techEnd
        ) {
          schedule.push({
            sampleId: sample.id,
            technicianId: technician.id,
            equipmentId: equip.id,
            startTime: currentStartTime,
            endTime: currentEndTime,
            priority: sample.priority,
          });
        }

        sumAnalysisTime += sampleDuration;
        assigned = true;
        break;
      }
    }
    const sampleEnd = shiftTimeByMinutes(currentStartTime, sampleDuration) as timeString;
    if (!lastEnd || DateTime.fromISO(sampleEnd) > DateTime.fromISO(lastEnd)) lastEnd = sampleEnd;
  }

  metrics.totalTime =
    firstStart && lastEnd
      ? DateTime.fromISO(lastEnd).diff(DateTime.fromISO(firstStart), "minutes").minutes
      : 0;
  metrics.efficiency = parseFloat(((sumAnalysisTime / metrics.totalTime) * 100).toFixed(1));

  return { schedule, metrics };
}
