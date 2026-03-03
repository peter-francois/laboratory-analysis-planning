import { z } from "zod";
import { TechnicianSpecialityEnum } from "../enum/technician.enum";

export const TechnicianSchema = z.object({
  id: z.string(),
  name: z.string(),
  speciality: z.enum(Object.values(TechnicianSpecialityEnum)),
  startTime: z.string().refine((val) => /^\d{2}:\d{2}$/.test(val), {
    message: "startTime doit être au format HH:MM",
  }),
  endTime: z.string().refine((val) => /^\d{2}:\d{2}$/.test(val), {
    message: "endTime doit être au format HH:MM",
  }),
});
