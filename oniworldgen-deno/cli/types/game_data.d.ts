export type dlcType = "vanilla" | "spacedOut" | "frostyPlanet"

export type GamePath = Record<dlcType, Record<"path", string>>;
export type GameData = Record<dlcType, Record<string, string>>;