import type { GamePath, Path } from "/cli/types/game_data.d.ts";

const OS = Deno.build.os;
let assetDir: string;

switch (OS) {
  // Windows
  case "windows":
    assetDir = "C:\\Program Files (x86)\\Steam\\steamapps\\common\\OxygenNotIncluded\\OxygenNotIncluded_Data\\StreamingAssets";
    break;
  // Mac
  case "darwin":
    assetDir = `${Deno.env.get("HOME")}/Library/Application Support/Steam/steamapps/common/OxygenNotIncluded/OxygenNotIncluded.app/Contents/Resources/Data/StreamingAssets`;
    break;
  default:
    throw new Error("Unsupported operating system");
}

export const traitPath: Path = {
  vanilla: { path: `${assetDir}/worldgen/traits` },
  spacedOut: { path: `${assetDir}/dlc/expansion1/worldgen/traits` },
  frostyPlanet: { path: `${assetDir}/dlc/dlc2/worldgen/traits` },
}

export const worldPath: Path = {
  vanilla: { path: `${assetDir}/worldgen/worlds` },
  spacedOut: { path: `${assetDir}/dlc/expansion1/worldgen/worlds` },
  frostyPlanet: { path: `${assetDir}/dlc/dlc2/worldgen/worlds` },
}

export const clusterPath: Path = {
  vanilla: { path: `${assetDir}/worldgen/clusters` },
  spacedOut: { path: `${assetDir}/dlc/expansion1/worldgen/clusters` },
  frostyPlanet: { path: `${assetDir}/dlc/dlc2/worldgen/clusters` },
}

export const gamePath: GamePath = {
  trait: traitPath,
  world: worldPath,
  cluster: clusterPath,
}