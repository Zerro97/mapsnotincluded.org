const fs = require('fs');
const compiledTraits = require("../compiledTraits.json");

/**
 * Given compiledTraits.json file, extract only world placement information.
 * Output file is useful for looking at the asteroid placement order in a given cluster
 */
function parseClusterWorldPlacements(traitData) {
  let worldPlacements = {}

  for(const [gameType, data] of Object.entries(traitData)) {
    for(const [clusterName, cluster] of Object.entries(data.clusters)) {
      worldPlacements[gameType] = {
        ...worldPlacements[gameType],
        [clusterName]: cluster.worldPlacements.map(worldPlacement => worldPlacement.world)
      }
    }
  }
  fs.writeFileSync('../test/utils/clusterWorldPlacement.json', JSON.stringify(worldPlacements, null, 4));
}

/**
 * Given compiledTraits.json file, extract general information about the cluster.
 */
function parseClusterGeneral(traitData) {
  // fs.writeFileSync('../test/utils/clusterGeneral.json', JSON.stringify(, null, 4));
}

/**
 * Given compiledTraits.json file, extract general information about the world.
 */
function parseWorldGeneral(traitData) {
  // fs.writeFileSync('../test/utils/worldGeneral.json', JSON.stringify(, null, 4));
}

/**
 * Given compiledTraits.json file, extract general information about the trait.
 */
function parseTraitGeneral(traitData) {
  // fs.writeFileSync('../test/utils/traitGeneral.json', JSON.stringify(, null, 4));
}

parseClusterWorldPlacements(compiledTraits)
// parseClusterGeneral(compiledTraits)
// parseWorldGeneral(compiledTraits)
// parseTraitGeneral(compiledTraits)