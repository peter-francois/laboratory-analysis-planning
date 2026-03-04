import { InputInterface } from "../types/interface/input.interface";
import { readFileSync } from "fs";
import { InputSchema } from "../types/schema/input.schema";

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
