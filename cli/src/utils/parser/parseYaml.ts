import type { GameData } from "/src/types/game_data.d.ts";
import type { TraitData } from "/src/types/trait_data.d.ts";
import type { ClusterData } from "/src/types/cluster_data.d.ts";
import type { WorldData } from "/src/types/world_data.d.ts";

import { ValidationError } from "@cliffy/command";
import { Entries } from "@typefest/mod.ts";
import { gamePath } from "../constants/path.ts";
import { parse } from "@std/yaml";

/**
 * Parses game yaml files
 * 
 * @returns parsed yaml object
 */
export async function parseYaml(): Promise<GameData> {
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
              throw new ValidationError("Unhandled exception occured while parsing yaml files");
            }
          }
        }
      } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
          // If specified file path does not exists
          continue;
        } else {
          throw new ValidationError("Unhandled exception occured while reading files");
        }
      }
    }
  }

  return gameData;
}