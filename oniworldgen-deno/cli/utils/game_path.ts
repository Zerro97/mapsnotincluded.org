import type { GameData } from "/cli/types/game_data.d.ts";

const os = Deno.build.os;

export default {
  vanilla: { path: "" },
  spacedOut: { path: "" },
  frostyPlanet: { path: "" },
} as GameData