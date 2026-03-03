import { z } from "zod";
import { TechnicianSpecialityEnum } from "../enum/technician.enum";

export const TechnicianSchema = z.object({
  id: z.string(),
  name: z.string(),
  speciality: z.enum(Object.values(TechnicianSpecialityEnum)),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, {
    message: "startTime doit être au format HH:MM",
  }),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, {
    message: "endTime doit être au format HH:MM",
  }),
});
