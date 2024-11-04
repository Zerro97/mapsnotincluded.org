import type { GameData } from "/cli/types/game_data.d.ts";

import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";
import { parse, stringify } from "@std/yaml";
import gamePaths from "../../../utils/path.ts"
import type { TraitData } from "/cli/types/trait_data.d.ts";

async function parseYaml() {
  const gameData: GameData = {
    vanilla: {},
    spacedOut: {},
    frostyPlanet: {},
  };
  const keyValues: Record<string, string> = {}

  // Loop through vanilla, spacedOut, frostyPlanet folders
  for (const [dlcType, gamePath] of Object.entries(gamePaths)) {
    try {
      // Loop through files in directory
      const directory = Deno.readDir(gamePath.path)
      for await (const entry of directory) {
        const filePath = `${gamePath.path}/${entry.name}`;
        const yamlFile = await Deno.readTextFile(filePath);
        const content = parse(yamlFile) as TraitData
        
        if(content.additionalSubworldFiles) {
          for(const [key, value] of Object.entries(content.additionalSubworldFiles)) {
            console.log(value)
            // for(const [key1, value1] of Object.entries(value.additionalSubworldFiles)) {
            //   keyValues[key1] = typeof(value1)
            // }
          }
        }
        // Assign parsed yaml file to GameData object
        // gameData[dlcType] = content;
      }
    } catch(error) {
      if (error instanceof Deno.errors.NotFound) {
        continue
      } else {
        console.error(error)
        return
      }
    }
  }

  console.log(keyValues)

  return gameData;
}

function generateJson() {

}

export const parseAllCommand = new Command()
  .name("all")
  .description("Parse oni yaml files and generate json files")
  // .action(function () {
  //   // If no arguments or options are provided, show help
  //   this.showHelp();
  // })
  // .option(
  //   "-p, --path <path:string>",
  //   "The base location of the game. ex. C:\\Program Files (x86)\\Steam\\steamapps\\common\\OxygenNotIncluded",
  //   { required: true },
  // )
  .action(() => {
    parseYaml()
    generateJson()
  })


// export const generateData = (gamePath: string) => {

// };