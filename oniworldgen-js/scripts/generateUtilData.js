const fs = require('fs');
const compiledTraits = require("../compiledTraits.json");

/**
 * Given compiledTraits.json file, extract only world placement information.
 * Output file is useful for looking at the asteroid placement order in a given cluster
 */
function parseClusterWorldPlacements() {
  // fs.writeFileSync('../test/utils/clusterWorldPlacement.json', JSON.stringify(, null, 4));
}

/**
 * Given compiledTraits.json file, extract general information about the cluster.
 */
function parseClusterGeneral() {
  // fs.writeFileSync('../test/utils/clusterGeneral.json', JSON.stringify(, null, 4));
}

/**
 * Given compiledTraits.json file, extract general information about the world.
 */
function parseWorldGeneral() {
  // fs.writeFileSync('../test/utils/worldGeneral.json', JSON.stringify(, null, 4));
}

/**
 * Given compiledTraits.json file, extract general information about the trait.
 */
function parseTraitGeneral() {
  // fs.writeFileSync('../test/utils/traitGeneral.json', JSON.stringify(, null, 4));
}
