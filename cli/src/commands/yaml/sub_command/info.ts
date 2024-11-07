import type { GameData } from "/src/types/game_data.d.ts";
import { Checkbox, Select, Input, Number, prompt } from "@cliffy/prompt";

import {
  Command,
  EnumType,
} from "@cliffy/command";
import { parseYaml } from "../../../utils/parser/parseYaml.ts";
import { getSuggestedBasePath } from "/src/utils/path.ts";

const ASSET_TYPE_OPTION = ["cluster", "trait", "world"] as const;
type AssetTypeTuple = typeof ASSET_TYPE_OPTION;
type AssetType = AssetTypeTuple[number];
const assetTypeOption = new EnumType(ASSET_TYPE_OPTION);

const DLC_OPTION = ["vanilla", "spacedOut", "frostyPlanet"] as const;
type DlcTuple = typeof DLC_OPTION;
type DlcType = DlcTuple[number];
const dlcOption = new EnumType(DLC_OPTION);

const DISPLAY_OPTION = ["key"] as const;
type DisplayTuple = typeof DISPLAY_OPTION;
type DisplayType = DisplayTuple[number];
const displayOption = new EnumType(DISPLAY_OPTION);

function filterByAsset(data: GameData, asset: AssetType): GameData {
  for (const key in data) {
    if (key !== asset) {
      data[key as AssetType] = { vanilla: [], spacedOut: [], frostyPlanet: [] };
    }
  }

  return data;
}

function filterByDlc(data: GameData, dlc: DlcType): GameData {
  for (const key in data) {
    for (const dlcKey in data[key as keyof GameData]) {
      if (dlcKey !== dlc) {
        // Clear out the non-matching DLC types by setting them to empty arrays
        data[key as keyof GameData][dlcKey as DlcType] = [];
      }
    }
  }

  return data;
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

function displayUniqueKeys(data: GameData) {
  console.log(JSON.stringify(getUniqueKeySet(data), null, 2));
}

export const infoSubCommand = new Command()
  .name("info")
  .description("Parse oni yaml files and output to console")
  // For registering enum type for option
  .type("dlc", dlcOption)
  .type("asset", assetTypeOption)
  .type("display", displayOption)
  .option(
    "-d, --display <display:display>",
    "Determine display format",
  )
  .option(
    "--dlc <dlc:dlc>",
    "For filtering by dlc type",
  )
  .option(
    "-a, --asset <asset:asset>",
    "For filtering by asset type",
  )
  .action(async (options) => {
    // Parse yaml file
    const suggestedBasePath = getSuggestedBasePath()
    let parsedData = null

    const result = await prompt([{
      name: "path",
      files: true,
      message: "Specify relative path to oni streaming assets folder",
      default: suggestedBasePath,
      suggestions: [suggestedBasePath],
      type: Input,
      after: async ({ path }, next) => { 
        if(!path) {
          console.log("Please specify file path")
          await next("path");
        } else {
          try {
            parsedData = await parseYaml(path);
            await next();
          } catch(error) {
            if (error instanceof Deno.errors.NotFound) {
              console.error("Folder does not exist. Please specify valid file path");
              await next("path");
            } else if (error instanceof Deno.errors.InvalidData) {
              console.error("Given file path is not oni streaming assets folder. Please specify valid file path");
              await next("path");
            } else {
              console.error(error);
              await next("path");
            }
          }
        }
      }
    }])
  });

      // // Filter parsed data
      // if (options.dlc) {
      //   data = filterByDlc(data, options.dlc);
      // }
      // if (options.asset) {
      //   data = filterByAsset(data, options.asset);
      // }
  
      // // Display data
      // if (options.display) {
      //   switch (options.display) {
      //     case "key": {
      //       displayUniqueKeys(data);
      //       break;
      //     }
      //   }
      // } else {
      //   console.log(data);
      // }