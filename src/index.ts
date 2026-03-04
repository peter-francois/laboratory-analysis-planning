import * as fs from "fs";
import { InputInterface } from "./types/interface/input.interface";
import { planifyLab } from "./services/schedule.service";
import { DEFAULT_OUTPUT_FILE } from "./config/path";
import path from "path";
import { loadAndValidateInput } from "./services/file.service";

function main() {
  const filePath: string = process.argv[2];

  if (!filePath) {
    console.error("Veuillez fournir un chemin vers un fichier JSON.");
    process.exit(1);
  }

  try {
    const data: InputInterface = loadAndValidateInput(filePath);

    const schedule = planifyLab(data);

    // Export in JSON
    const dir = path.dirname(DEFAULT_OUTPUT_FILE);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(DEFAULT_OUTPUT_FILE, JSON.stringify(schedule, null, 2));
  } catch (error) {
    console.error("Erreur lors du traitement :", error);
    process.exit(1);
  }
}
main();
