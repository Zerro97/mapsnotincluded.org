import type { GameData } from "/src/types/game_data.d.ts";
import type { TraitData } from "/src/types/trait_data.d.ts";
import type { ClusterData } from "/src/types/cluster_data.d.ts";
import type { WorldData } from "/src/types/world_data.d.ts";

import { ValidationError } from "@cliffy/command";
import { Entries } from "@typefest/mod.ts";
import { getGamePath } from "../path.ts";
import { parse } from "@std/yaml";

async function checkFilePath(path: string) {
  // Check if given file path is directory
  const stat = await Deno.stat(path);
  if (!stat.isDirectory) {
    throw new Deno.errors.InvalidData("The specified path is not a directory.");
  }

  // Check if directory contains following required directories
  const requiredDirs = new Set(["dlc", "codex", "worldgen", "strings"]);
  for await (const entry of Deno.readDir(path)) {
    if (entry.isDirectory) requiredDirs.delete(entry.name);
  }
  if (requiredDirs.size > 0) {
    throw new Deno.errors.InvalidData(
      "Given file path is not oni streaming assets folder"
    );
  }
}

/**
 * Parses game yaml files
 * 
 * @returns parsed yaml object
 */
export async function parseYaml(filePath: string): Promise<GameData> {
  // Check if valid file path. Throw error if not
  await checkFilePath(filePath)

  // Get different game path based on given base path
  const gamePath = getGamePath(filePath)

  // Create empty gameData for storing parsed data
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
  for (const [infoType, outerPath] of Object.entries(gamePath) as Entries<typeof gamePath>) {
    // Loop through vanilla, spacedOut, frostyPlanet
    for (const [dlcType, innerPath] of Object.entries(outerPath) as Entries<typeof outerPath>) {
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
              throw error;
            }
          }
        }
      } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
          // If specified file path does not exists
          continue;
        } else {
          throw error;
        }
      }
    }
  }

  return gameData;
}