import type { TraitData } from "/cli/types/trait_data.d.ts";

export type dlcType = "vanilla" | "spacedOut" | "frostyPlanet"

export type GamePath = Record<dlcType, Record<"path", string>>;
export type GameData = Record<dlcType, TraitData>;