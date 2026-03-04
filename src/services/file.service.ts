import * as fs from "fs";
import path from "path";
import { InputInterface } from "../types/interface/input.interface";
import { readFileSync } from "fs";
import { InputSchema } from "../types/schema/input.schema";
import { OutputInterface } from "../types/interface/output.interface";
import { DateTime } from "luxon";
import { BASE_DIR } from "../config/path";

export function loadAndValidateInput(filePath: string): InputInterface {
  const fileContent = readFileSync(filePath, "utf-8");
  const parsedData: InputInterface = JSON.parse(fileContent);

  // Zod validation of inut file
  const result = InputSchema.safeParse(parsedData);

  if (!result.success) {
    throw new Error("Fichier JSON invalide :" + result.error.message);
  }
  return result.data;
}

export function exportSchedule(output: OutputInterface): void {
  const now = DateTime.now();
  const year = now.toFormat("yyyy");
  const mounth = now.toFormat("MM");
  const filetimestamp = now.toFormat("yyyy-MM-dd");
  const finalDir = path.join(BASE_DIR, year, mounth);
  const fileName = `schedule-${filetimestamp}.json`;
  const filePath = path.join(finalDir, fileName);

  fs.mkdirSync(finalDir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(output, null, 2));
  console.log("File saved at:", filePath);
}
