import * as fs from "fs";

import { readFileSync } from "fs";
import { InputInterface } from "./types/interface/input.interface";

function main() {
  const filePath: string = process.argv[2];

  if (!filePath) {
    console.error("Veuillez fournir un chemin vers un fichier JSON.");
    process.exit(1);
  }

  try {
    const fileContent = readFileSync(filePath, "utf-8");
    const parsedData: InputInterface = JSON.parse(fileContent);

    console.log("Fichier JSON chargé avec sucès :", parsedData);
  } catch (error) {
    console.error("Erreur lors du traitement :", error);
  }
}
main();
