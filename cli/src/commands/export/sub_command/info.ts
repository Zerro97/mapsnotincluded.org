import { Command, EnumType, ValidationError } from "cliffy/command/mod.ts";

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

export const infoSubCommand = new Command()
  .name("info")
  .description("Parse mongoDB export data and output to console. Default to displaying seed count")
  .option(
    "-p, --path <path:string>",
    "File path to export file",
    { required: true }
  )
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
    const exportData = await parseExportJson(options.path)

    if(options.schema) {
      displayUniqueKeys(exportData)
    } else {
      displayCount(exportData, [])
    }
  });
