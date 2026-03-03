import * as fs from "fs";

import { readFileSync } from "fs";
import { InputInterface } from "./types/interface/input.interface";
import { InputSchema } from "./types/schema/input.schema";

function main() {
  const filePath: string = process.argv[2];

  if (!filePath) {
    console.error("Veuillez fournir un chemin vers un fichier JSON.");
    process.exit(1);
  }

  try {
    const fileContent = readFileSync(filePath, "utf-8");
    const parsedData: InputInterface = JSON.parse(fileContent);

    const result = InputSchema.safeParse(parsedData);

    if (!result.success) {
      console.error("Fichier JSON invalide :", result.error);
      process.exit(1);
    }

    console.log("Fichier JSON chargé avec sucès :", parsedData);
  } catch (error) {
    console.error("Erreur lors du traitement :", error);
  }
}
main();
