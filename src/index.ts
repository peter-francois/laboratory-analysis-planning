import { InputInterface } from "./types/interface/input.interface";
import { planifyLab } from "./services/schedule.service";
import { exportSchedule, loadAndValidateInput } from "./services/file.service";

function main() {
  const filePath: string = process.argv[2];

  if (!filePath) {
    console.error("Veuillez fournir un chemin vers un fichier JSON.");
    process.exit(1);
  }

  try {
    const data: InputInterface = loadAndValidateInput(filePath);

    const output = planifyLab(data);

    // Export in JSON
    exportSchedule(output);
  } catch (error) {
    console.error("Erreur lors du traitement :", error);
    process.exit(1);
  }
}
main();
