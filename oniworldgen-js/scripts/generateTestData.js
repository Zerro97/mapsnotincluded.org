const fs = require('fs');
const mongoDBExport = require("../data.json");

/**
 * Parse seed string into individual parts 
 * 
 * @param {string} seed Example: "CER-A-487061744-0-0-0"
 * @returns Parsed object containing seed parts (cluster, seed, game setting, story trait, mix)
 */
function parseSeedString(seed) {
  // Split the string by dashes
  let parts = seed.split('-');
  
  // Find the index of the first numeric part (second section)
  let indexOfSecondPart = parts.findIndex(part => /^\d+$/.test(part));

  // Extract each section based on the index of the second part
  let section1 = parts.slice(0, indexOfSecondPart).join('-'); // Join the parts before the second section
  let section2 = parts[indexOfSecondPart];                     // The numeric second part
  let section3 = parts[indexOfSecondPart + 1];
  let section4 = parts[indexOfSecondPart + 2];
  let section5 = parts[indexOfSecondPart + 3];

  return [section1, section2, section3, section4, section5];
}

/**
 * Takes in mongoDB export json file and parses it into test data.
 * 
 * @param {number} generatedSeedCount Total number of seed to be included in test fixture file
 */
function exportToTestData(generatedSeedCount) {
  let vanillaSeeds = []
  let spacedOutSeeds = []
  let count = 0

  for(const cluster of mongoDBExport) {
    // Stop adding seeds if seed count has been reached
    if(count > generatedSeedCount) {
      break
    }

    // Split seed into half/half for vanilla and spacedOut
    if(cluster.asteroids.length == 1 && vanillaSeeds.length > (generatedSeedCount / 2)) {
      continue
    }
    if(cluster.asteroids.length > 1 && spacedOutSeeds.length > (generatedSeedCount / 2)) {
      continue
    }

    // Parse seed string into object with 5 parts of the seed
    let parsedSeed = parseSeedString(cluster.coordinate)
    let seed = {
      coordinate: {
        cluster: parsedSeed[0],
        seed: parsedSeed[1],
        gameSetting: parsedSeed[2],
        storyTrait: parsedSeed[3],
        mix: parsedSeed[4]
      },
      expectedTraits: []
    }
    
    // Add world traits of all the asteroids in cluster
    for(const asteroid of cluster.asteroids) {
      seed.expectedTraits.push(...asteroid.worldTraits)
    }
    
    // Split seed by asteroid count (single asteroid indicate base game)
    if(cluster.asteroids.length == 1) {
      vanillaSeeds.push(seed)
    } else {
      spacedOutSeeds.push(seed)
    }

    count++
  }

  fs.writeFileSync('../test/fixtures/vanillaSeeds.json', JSON.stringify(vanillaSeeds, null, 4));
  fs.writeFileSync('../test/fixtures/spacedOutSeeds.json', JSON.stringify(spacedOutSeeds, null, 4));
}

exportToTestData(100)