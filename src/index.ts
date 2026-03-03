import * as fs from "fs";

import { readFileSync } from "fs";
import { InputInterface } from "./types/interface/input.interface";
import { InputSchema } from "./types/schema/input.schema";
import { planifyLab } from "./services/schedule.service";
import { DEFAULT_OUTPUT_FILE } from "./config/path";

function main() {
  const filePath: string = process.argv[2];

  if (!filePath) {
    console.error("Veuillez fournir un chemin vers un fichier JSON.");
    process.exit(1);
  }

  try {
    const fileContent = readFileSync(filePath, "utf-8");
    const parsedData: InputInterface = JSON.parse(fileContent);

    // Zod validation of inut file
    const result = InputSchema.safeParse(parsedData);

    if (!result.success) {
      console.error("Fichier JSON invalide :", result.error);
      process.exit(1);
    }

    const data: InputInterface = result.data as InputInterface

    const schedule = planifyLab(data)

    // Export in JSON
    fs.writeFileSync(DEFAULT_OUTPUT_FILE, JSON.stringify(schedule, null, 2))

  } catch (error) {
    console.error("Erreur lors du traitement :", error);
  }
}
main();
