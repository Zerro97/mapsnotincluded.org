import type { GameData } from "/cli/types/game_data.d.ts";

import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";
import { parse, stringify } from "@std/yaml";
import gamePaths from "/cli/utils/game_path.ts"

async function parseYaml() {
  const gameData: GameData = {
    vanilla: {},
    spacedOut: {},
    frostyPlanet: {},
  };

  // Loop through vanilla, spacedOut, frostyPlanet folders
  for (const [dlcType, gamePath] of Object.entries(gamePaths)) {
    // Loop through files in directory
    for await (const entry of Deno.readDir(gamePath.path)) {
      const filePath = `${gamePath.path}/${entry.name}`;
      const yamlFile = await Deno.readTextFile(filePath);
      const content = parse(yamlFile)

      // Assign parsed yaml file to GameData object
      gameData[dlcType] = content;
    }
  }

  return gameData;
}

function generateJson() {

}

export const parseAllCommand = new Command()
  .name("all")
  .description("Parse oni yaml files and generate json files")
  .action(function () {
    // If no arguments or options are provided, show help
    this.showHelp();
  })
  .option(
    "-p, --path <path:string>",
    "The base location of the game. ex. C:\\Program Files (x86)\\Steam\\steamapps\\common\\OxygenNotIncluded",
    { required: true },
  )
  .action(() => {
    parseYaml()
    generateJson()
  })


// export const generateData = (gamePath: string) => {

// };
