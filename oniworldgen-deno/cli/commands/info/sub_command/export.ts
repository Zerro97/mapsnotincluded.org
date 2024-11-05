import { Command, EnumType } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";

const DISPLAY_OPTION = ["key", "count"] as const;
type DisplayTuple = typeof DISPLAY_OPTION;
type DisplayType = DisplayTuple[number];
const displayOption = new EnumType(DISPLAY_OPTION);

async function parseExportJson(filePath: string) {
  try {
    const jsonText = await Deno.readTextFile(filePath);
    return JSON.parse(jsonText);
  } catch(error) {
    if (error instanceof Deno.errors.NotFound) {
      console.error("Error: file not found from specified file path");
    } else {
      console.error(error);
      Deno.exit();
    }
  }
}

function getUniqueKeySet(obj: object): object | string {
  if (Array.isArray(obj)) {
    // Process arrays by mapping over elements and showing types
    return obj.length > 0 ? [getUniqueKeySet(obj[0])] : [];
  } else if (typeof obj === "object" && obj !== null) {
    // Process objects by mapping values to keys
    const uniqueKeys: { [key: string]: object | string } = {};
    for (const key in obj) {
      uniqueKeys[key] = getUniqueKeySet(obj[key]);
    }
    return uniqueKeys;
  }
  // For non-objects and non-arrays, return the type of the value
  return typeof obj;
}

function displayUniqueKeys(data: Array<object>) {
  console.log(getUniqueKeySet(data));
}

export const exportSubCommand = new Command()
  .name("export")
  .description("Parse mongoDB export data and output to console")
  .type("display", displayOption)
  .option(
    "-p, --path <path:string>",
    "File path to export file",
    { required: true }
  )
  .option(
    "-d, --display <display:display>",
    "Determine display format",
  )
  .action(async (options) => {
    const exportData = await parseExportJson(options.path)

    switch(options.display) {
      case "key": {
        displayUniqueKeys(exportData)
        break
      }
      case "count": {
        break
      }
      default: {
        console.log(exportData)
        break
      }
    }
  });
