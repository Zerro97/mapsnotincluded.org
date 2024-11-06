import { Command, EnumType, ValidationError } from "@cliffy/command";
import { colors } from "@cliffy/ansi/colors";
import { Checkbox, Select, Input, Number, prompt } from "@cliffy/prompt";

async function parseExportJson(filePath: string) {
  try {
    const jsonText = await Deno.readTextFile(filePath);
    return JSON.parse(jsonText);
  } catch(error) {
    if (error instanceof Deno.errors.NotFound) {
      throw new ValidationError("File not found from specified file path");
    } else {
      throw new ValidationError("Unhandled exception occured while reading file");
    }
  }
}

function getUniqueKeySet(obj: unknown): object | string {
  if (Array.isArray(obj)) {
    // If it's an array, map over each element to get unique key sets for nested arrays
    return obj.length > 0 ? [getUniqueKeySet(obj[0])] : [];
  } else if (typeof obj === "object" && obj !== null) {
    // Process objects by mapping values to keys
    const uniqueKeys: { [key: string]: object | string } = {};
    for (const key in obj) {
      uniqueKeys[key] = getUniqueKeySet((obj as Record<string, unknown>)[key]);
    }
    return uniqueKeys;
  }
  // For non-objects and non-arrays, return the type of the value
  return typeof obj;
}

function displayUniqueKeys(data: Array<object>) {
  console.log(JSON.stringify(getUniqueKeySet(data), null, 2));
}

function displayCount(data: Array<object>, filters: string[]) {
  // let filterString = filters.length == 0 ? "none" : filters.join(", ")
  // console.log(`Seed Count: ${data.length}, Filter: ${filterString}`)
  // data.forEach((seed, index) => {
  //   if(seed.dlcs.includes("SpacedOut") && index < 20){
  //     // console.log(seed.asteroids.map(asteroid => asteroid.pointsOfInterest.length).join(", "))
  //     console.log(seed.asteroids.map(asteroid => asteroid.pointsOfInterest))
  //   }
  // })
  // console.log(data[2].dlcs)
  // console.log(data[2].asteroids.map(asteroid => asteroid.id).join(",\n"))
}

async function promptSpacedOut() {
  const gameType = await Select.prompt({
    message: "Select game mode",
    options: [
      "Classic",
      "Spaced Out!",
      "The Lab",
    ]
  })

  const startingAstroid = await Select.prompt({
    message: "Select starting asteroid",
    options: [
      "terra",
      "ceres",
      "blasted ceres",
      "oceania",
      "squelchy",
      "rime",
      "verdante",
      "arboria",
      "volcanea",
      "the badlands",
      "aridio",
      "oasisse",
      "terrania",
      "ceres minor",
      "folia",
      "quagmiris",
      "metallic swampy moonlet",
      "the desolands moonlet",
      "frozen forest moonlet",
      "flipped moonlet",
      "radioactive ocean moonlet",
    ]
  })

  const traitList = await Checkbox.prompt({
    message: "Select traits",
    options: [
      "boulders large",
      "boulders medium",
      "boulders mixed",
      "boulders small",
      "buried oil",
      "deep oil",
      "frozen core",
      "geo active",
      "geo dormant",
      "geodes",
      "glaciers large",
      "irregular oil",
      "magma vents",
      "metal poor",
      "metal rich",
      "misaligned start",
      "slime splats",
      "subsurface ocean",
      "volcanoes",
    ]
  })

  const geyserList = await Checkbox.prompt({
    message: "Select geyser",
    options: [
      "cool steam vent",
      "hot steam vent",
      "water geyser",
      "cool slush geyser",
      "polluted water vent",
      "cool salt slush geyser",
      "salt water geyser",
      "minor volcano",
      "volcano",
      "carbon dioxide geyser",
      "carbon dioxide vent",
      "hydrogen vent",
      "hot polluted oxygen vent",
      "infectious polluted oxygen vent",
      "chlorine gas vent",
      "natural gas geyser",
      "copper volcano",
      "iron volcano",
      "gold volcano",
      "leaky oil fissure",
      "oil reservoir",
    ],
  })

  for(const geyser of geyserList) {
    const geyserCount = await Number.prompt({
      message: `Select geyser count for ${geyser}`,
      min: 0,
      max: 10,
    })
  }
}

async function promptVanilla() {
  const gameType = await Select.prompt({
    message: "Select game mode",
    options: [
      "Standard",
      "The Lab",
    ]
  })

  const startingAstroid = await Select.prompt({
    message: "Select starting asteroid",
    options: [
      "Terra",
      "Oceania",
      "Rime",
      "Verdante",
      "Arboria",
      "Volcanea",
      "Badlands",
      "Aridio",
      "Oasisse",
    ]
  })

  const traitList = await Checkbox.prompt({
    message: "Select traits",
    options: [
      "boulders large",
      "boulders medium",
      "boulders mixed",
      "boulders small",
      "buried oil",
      "deep oil",
      "frozen core",
      "geo active",
      "geo dormant",
      "geodes",
      "glaciers large",
      "irregular oil",
      "magma vents",
      "metal poor",
      "metal rich",
      "misaligned start",
      "slime splats",
      "subsurface ocean",
      "volcanoes",
    ]
  })

  const geyserList = await Checkbox.prompt({
    message: "Select geysers",
    options: [
      "cool steam vent",
      "hot steam vent",
      "water geyser",
      "cool slush geyser",
      "polluted water vent",
      "cool salt slush geyser",
      "salt water geyser",
      "minor volcano",
      "volcano",
      "carbon dioxide geyser",
      "carbon dioxide vent",
      "hydrogen vent",
      "hot polluted oxygen vent",
      "infectious polluted oxygen vent",
      "chlorine gas vent",
      "natural gas geyser",
      "copper volcano",
      "iron volcano",
      "gold volcano",
      "aluminium volcano",
      "tungsten volcano",
      "niobium volcano",
      "cobalt volcano",
      "leaky oil fissure",
      "sulfur geyser",
      "oil reservoir",
    ],
  })

  for(const geyser of geyserList) {
    const geyserCount = await Number.prompt({
      message: `Select geyser count for ${geyser}`,
      min: 0,
      max: 10,
    })
  }
}

export const infoSubCommand = new Command()
  .name("info")
  .description("Parse mongoDB export data and output to console. Default to displaying seed count")
  .option(
    "-s, --schema",
    "Show schema of export file",
  )
  .option(
    "-f, --filter <filter:filter>",
    "Filter export data",
    { conflicts: ["schema"] }
  )
  .action(async (options) => {
    let exportContent: []
    const result = await prompt([{
      name: "path",
      files: true,
      message: "Specify relative path to mongoDB export file",
      type: Input,
      after: async ({ path }, next) => { 
        if(!path) {
          console.log("Please specify file path")
          await next("path");
        } else {
          try {
            const content = await Deno.readTextFile(path);
            exportContent = JSON.parse(content);
            await next();
          } catch(error) {
            if (error instanceof Deno.errors.NotFound) {
              console.error("File does not exist. Please specify valid file path");
              await next("path");
          } else if (error instanceof SyntaxError) {
              console.error("Invalid JSON format. Please specify valid file path");
              await next("path");
            } else {
              console.error("Please specify valid file path");
              await next("path");
            }
          }
        }
      },
    }, {
      name: "dlc",
      message: "Select DLC types (Space for select, Enter for submit)",
      type: Checkbox,
      options: ["Spaced Out", "Frosty Planet"],
    }]);

    if(result.dlc?.includes("Spaced Out")) {
      promptSpacedOut()
    } else {
      promptVanilla()
    }

    // , {
    //   name: "dlc_geyser_filter",
    //   message: "",
    //   type: Checkbox,
    //   options: [

    //   ],
    // }

    // const exportData = await parseExportJson(options.path)

    // if(options.schema) {
    //   displayUniqueKeys(exportData)
    // } else {
    //   displayCount(exportData, [])
    // }
  });
