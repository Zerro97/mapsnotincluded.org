import type { GameData } from "/src/types/game_data.d.ts";
import type { TraitData } from "/src/types/trait_data.d.ts";
import type { ClusterData } from "/src/types/cluster_data.d.ts";
import type { WorldData } from "/src/types/world_data.d.ts";

import {
  Command,
  EnumType,
  ValidationError,
} from "@cliffy/command";
import { Entries } from "@typefest/mod.ts";
import { gamePath } from "/src/utils/path.ts";
import { parse } from "@std/yaml";

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

async function parseYaml(): Promise<GameData> {
  const gameData: GameData = {
    cluster: {
      vanilla: [] as ClusterData[],
      spacedOut: [] as ClusterData[],
      frostyPlanet: [] as ClusterData[],
    },
    world: {
      vanilla: [] as WorldData[],
      spacedOut: [] as WorldData[],
      frostyPlanet: [] as WorldData[],
    },
    trait: {
      vanilla: [] as TraitData[],
      spacedOut: [] as TraitData[],
      frostyPlanet: [] as TraitData[],
    },
  };

  // Loop through world, trait, cluster
  for (
    const [infoType, outerPath] of Object.entries(gamePath) as Entries<
      typeof gamePath
    >
  ) {
    // Loop through vanilla, spacedOut, frostyPlanet
    for (
      const [dlcType, innerPath] of Object.entries(outerPath) as Entries<
        typeof outerPath
      >
    ) {
      try {
        // Loop through files in directory
        for await (const entry of Deno.readDir(innerPath.path)) {
          // Read yaml file
          const filePath = `${innerPath.path}/${entry.name}`;
          const yamlFile = await Deno.readTextFile(filePath);

          try {
            // Assign parsed yaml
            switch (infoType) {
              case "trait":
                gameData.trait[dlcType].push(parse(yamlFile) as TraitData);
                break;
              case "world":
                gameData.world[dlcType].push(parse(yamlFile) as WorldData);
                break;
              case "cluster":
                gameData.cluster[dlcType].push(parse(yamlFile) as ClusterData);
                break;
            }
          } catch (error) {
            // Some yaml files contain duplicate keys causing parsing error
            if (
              error instanceof SyntaxError &&
              error.message.includes("duplicated key")
            ) {
              continue;
            } else {
              throw new ValidationError("Unhandled exception occured while parsing yaml files");
            }
          }
        }
      } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
          console.error("Error: file not found from specified file path");
          continue;
        } else {
          throw new ValidationError("Unhandled exception occured while reading files");
        }
      }
    }
  }

  return gameData;
}

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
    let data = await parseYaml();

    // Filter parsed data
    if (options.dlc) {
      data = filterByDlc(data, options.dlc);
    }
    if (options.asset) {
      data = filterByAsset(data, options.asset);
    }

    // Display data
    if (options.display) {
      switch (options.display) {
        case "key": {
          displayUniqueKeys(data);
          break;
        }
      }
    } else {
      console.log(data);
    }
  });
