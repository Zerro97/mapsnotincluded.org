import type { GameData, GamePath } from "/cli/types/game_data.d.ts";

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

export const traitPath: GamePath = {
  vanilla: { path: `${assetDir}/worldgen/traits` },
  spacedOut: { path: `${assetDir}/dlc/expansion1/worldgen/traits` },
  frostyPlanet: { path: `${assetDir}/dlc/dlc2/worldgen/traits` },
}