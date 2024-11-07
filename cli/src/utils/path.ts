import type { GamePath, Path } from "/src/types/game_data.d.ts";

export function getSuggestedBasePath(): string {
  const OS = Deno.build.os;
  
  switch (OS) {
    // Windows
    case "windows":
      return "C:\\Program Files (x86)\\Steam\\steamapps\\common\\OxygenNotIncluded\\OxygenNotIncluded_Data\\StreamingAssets";
    // Mac
    case "darwin":
      return `${Deno.env.get("HOME")}/Library/Application Support/Steam/steamapps/common/OxygenNotIncluded/OxygenNotIncluded.app/Contents/Resources/Data/StreamingAssets`;
    default:
      return ""
  }
}

export function getTraitPath(assetDir: string): Path {
  return {
    vanilla: { path: `${assetDir}/worldgen/traits` },
    spacedOut: { path: `${assetDir}/dlc/expansion1/worldgen/traits` },
    frostyPlanet: { path: `${assetDir}/dlc/dlc2/worldgen/traits` },
  }
};

export function getWorldPath(assetDir: string): Path {
  return {
    vanilla: { path: `${assetDir}/worldgen/worlds` },
    spacedOut: { path: `${assetDir}/dlc/expansion1/worldgen/worlds` },
    frostyPlanet: { path: `${assetDir}/dlc/dlc2/worldgen/worlds` },
  }
};

export function getClusterPath(assetDir: string): Path {
  return {
    vanilla: { path: `${assetDir}/worldgen/clusters` },
    spacedOut: { path: `${assetDir}/dlc/expansion1/worldgen/clusters` },
    frostyPlanet: { path: `${assetDir}/dlc/dlc2/worldgen/clusters` },
  }
};

export function getGamePath(assetDir: string): GamePath {
  return {
    trait: getTraitPath(assetDir),
    world: getWorldPath(assetDir),
    cluster: getClusterPath(assetDir),
  }
};
