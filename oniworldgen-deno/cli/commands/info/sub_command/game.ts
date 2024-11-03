import type { GameData } from "/cli/types/game_data.d.ts";
import type { TraitData } from "/cli/types/trait_data.d.ts";

import { Command, EnumType, ValidationError } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";
import { Entries } from "https://deno.land/x/fest/mod.ts";
import { traitPath } from "/cli/utils/path.ts"
import { parse } from "@std/yaml";

const filter = new EnumType(["all", "cluster", "placement", "trait", "world"]);

async function parseYaml(): Promise<GameData> {
  const emptyData: TraitData = {
    name: "",
    description: "",
    colorHex: "",
    exclusiveWith: [],
    traitTags: [],
  }
  const gameData: GameData = {
    vanilla: emptyData,
    spacedOut: emptyData,
    frostyPlanet: emptyData,
  };

  // Loop through vanilla, spacedOut, frostyPlanet folders
  for (const [dlcType, gamePath] of Object.entries(traitPath) as Entries<typeof traitPath>) {
    try {
      // Loop through files in directory
      const directory = Deno.readDir(gamePath.path)
      for await (const entry of directory) {
        const filePath = `${gamePath.path}/${entry.name}`;
        const yamlFile = await Deno.readTextFile(filePath);
        gameData[dlcType] = parse(yamlFile) as TraitData
      }
    } catch(error) {
      if (error instanceof Deno.errors.NotFound) {
        continue
      } else {
        console.error(error)
        Deno.exit()
      }
    }
  }

  return gameData;
}

function filterData(data: GameData): GameData {
  return data
}

function selectLevel(data: GameData): GameData {
  return data
}

function displayUniqueKeys(data: GameData) {
  console.log(data)
}

function displayDataCount(data: GameData) {
  console.log(data)
}

export const parseGameCommand = new Command()
  .name("export")
  .description("Parse oni yaml files and output to console")
  // For registering enum type for option
  .type("filter", filter)
  // Options that are applicable for all sub commands
  .option(
    "-k, --key",
    "Output json containing unique set of key strings",
  )
  .option(
    "-t, --test",
    "Output json useful for testing",
  )
  .option(
    "-l, --level <level:integer>",
    "For selecting depth of yaml/json file",
  )
  .option(
    "-c, --count",
    "For counting number of matching data",
  )
  .option(
    "-f, --filter <name: filter>",
    "For filtering the data",
    { default: "all" }
  )
  .action(async (options) => {
    // Check for options that shouldn't be possible to exist together
    if(options.count && options.key) {
      throw new ValidationError("You cannot specify --count and --key options together");
    }

    // Parse yaml file
    let data = await parseYaml()

    // Filter parsed data
    if(options.filter) {
      data = filterData(data)
    }
    if(options.level) {
      data = selectLevel(data)
    }
    
    // Display data
    if(options.key) {
      displayUniqueKeys(data)
    } else if(options.count) {
      displayDataCount(data)
    } else {
      console.log(data)
    }
  })
