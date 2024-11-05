## CLI 
### Commands
1. `oni info mongo/yaml` (print to console)
2. `oni parse mongo/yaml` (print to json)
3. `oni generate seed/trait` (print to console, seed generation and reverse)

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
  // less than, more than, equal to
  operation: {
    geyser: {geyserType: number}[],
  }
  // Seed contains specified element
  contain: {
    poi: string[],
    asteroid: string[],
    trait: string[]
  },
  // Total count
  geyserCount: number,
  poiCount: number,
}
```

2. FrostyPlanet
```ts
{
  // less than, more than, equal to
  operation: {
    geyser: {geyserType: number}[],
  }
  // Seed contains specified element
  contain: {
    poi: string[],
    asteroid: string[],
    trait: string[]
  },
  // Total count
  geyserCount: number,
  poiCount: number,
}
```

3. SpacedOut
```ts
{
  // less than, more than, equal to
  operation: {
    geyser: {geyserType: number}[],
    poi: {poiType: number}[],
    trait: {traitType: number}[]
  }
  // Seed contains specified element
  contain: {
    asteroid: string[],
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
  // less than, more than, equal to
  operation: {
    geyser: {geyserType: number}[],
    poi: {poiType: number}[],
    trait: {traitType: number}[]
  }
  // Seed contains specified element
  contain: {
    asteroid: string[],
  },
  // Total count
  totalGeyserCount: number,
  totalPoiCount: number,
  asteroidCount: number,
}
