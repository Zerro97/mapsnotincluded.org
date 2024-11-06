## CLI 
### Commands
1. `oni game info/parse` (yaml file to console/json)
2. `oni export info/parse` (mongoDB export file to console/json)
3. `oni generate seed/trait` (seed generation and reverse, displayed on console)

### Options
1. `--path`: Game file path (all)
2. `--test`: Output json useful for testing (export)
3. `--display`: Determine display format. Either display unique key sets or count or full data (game)
4. `--dlc`: For filtering by dlc type (game)
5. `--asset`: For filtering by asset type (game)
6. `--seed`: For specifying seed while generating trait (generate)
7. `--trait`: For specifying trait while generating seed (generate)

### Export Info
Possible useful filters for finding specific seed and counting  number of seeds that matches 

1. Vanilla:
```ts
{
  // Seeds that contain specified element
  equal: {
    geyser: string[],
    poi: string[],
    asteroid: string[],
    trait: string[]
  },
  // Seeds that contain more than specified element count
  moreThan: {
    geyser: {geyserType: number}[],
  }
  // Seeds that contain less than specified element count
  lessThan: {
    geyser: {geyserType: number}[],
  }
  // Total count
  geyserCount: number,
  poiCount: number,
}
```

2. FrostyPlanet
```ts
{
  // Seeds that contain specified element
  equal: {
    geyser: string[],
    poi: string[],
    asteroid: string[],
    trait: string[]
  },
  // Seeds that contain more than specified element count
  moreThan: {
    geyser: {geyserType: number}[],
  }
  // Seeds that contain less than specified element count
  lessThan: {
    geyser: {geyserType: number}[],
  }
  // Total count
  geyserCount: number,
  poiCount: number,
}
```

3. SpacedOut
```ts
{
  // Seeds that contain more than specified element count
  moreThan: {
    geyser: {geyserType: number}[],
    poi: {poiType: number}[],
    trait: {traitType: number}[]
  }
  // Seeds that contain less than specified element count
  lessThan: {
    geyser: {geyserType: number}[],
    poi: {poiType: number}[],
    trait: {traitType: number}[]
  }
  // Seeds that contains specified element
  contain: {
    geyser: string[],
    poi: string[],
    asteroid: string[],
    trait: string[]
  },
  // Total count
  totalGeyserCount: number,
  totalPoiCount: number,
  asteroidCount: number,
}
```

4. SpacedOut & FrostyPlanet
```js
{
  // Seeds that contain more than specified element count
  moreThan: {
    geyser: {geyserType: number}[],
    poi: {poiType: number}[],
    trait: {traitType: number}[]
  }
  // Seeds that contain less than specified element count
  lessThan: {
    geyser: {geyserType: number}[],
    poi: {poiType: number}[],
    trait: {traitType: number}[]
  }
  // Seeds that contains specified element
  contain: {
    geyser: string[],
    poi: string[],
    asteroid: string[],
    trait: string[]
  },
  // Total count
  totalGeyserCount: number,
  totalPoiCount: number,
  asteroidCount: number,
}
```

### Examples
Getting export schema:
```bash
oni export info --path ./data.json --s
```

Getting seeds that matches filter:
```bash
oni export info --path ./data.json --dlc frostyPlanet spacedOut --filter { \
  moreThan: { \
    geyser: { \
      "volcano": 5 \
    }, \
    trait: { \
      "metalRich": 2 \
    } \
  } \
} \
```

Getting seed count in export that matches filter:
```bash
oni export info --path ./data.json --dlc frostyPlanet spacedOut --count --filter { \
  moreThan: { \
    geyser: { \
      "volcano": 5 \
    }, \
    trait: { \
      "metalRich": 2 \
    } \
  } \
} \
```