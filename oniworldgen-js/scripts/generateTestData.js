const fs = require('fs');
const mongoDBExport = require("../data.json");

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

function exportToTestData() {
  let vanillaSeeds = []
  let spacedOutSeeds = []

  for(const cluster of mongoDBExport) {
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
    
    for(const asteroid of cluster.asteroids) {
      seed.expectedTraits.push(...asteroid.worldTraits)
    }
    
    if(cluster.asteroids.length == 1) {
      vanillaSeeds.push(seed)
    } else {
      spacedOutSeeds.push(seed)
    }
  }

  fs.writeFileSync('../test/fixtures/vanillaSeeds.json', JSON.stringify(vanillaSeeds, null, 4));
  fs.writeFileSync('../test/fixtures/spacedOutSeeds.json', JSON.stringify(spacedOutSeeds, null, 4));
}

exportToTestData()