import type { TraitData } from "/src/types/trait_data.d.ts";
import type { WorldData } from "/src/types/world_data.d.ts";
import type { ClusterData } from "/src/types/cluster_data.d.ts";

export type DlcType = "vanilla" | "spacedOut" | "frostyPlanet";
export type InfoType = "trait" | "world" | "cluster";

export type GamePath = Record<InfoType, Path>;
export type Path = Record<DlcType, Record<"path", string>>;

export type InfoTypeMap = {
  world: WorldData;
  trait: TraitData;
  cluster: ClusterData;
};

export type GameData = {
  [K in keyof InfoTypeMap]: {
    vanilla: InfoTypeMap[K][];
    spacedOut: InfoTypeMap[K][];
    frostyPlanet: InfoTypeMap[K][];
  };
};
