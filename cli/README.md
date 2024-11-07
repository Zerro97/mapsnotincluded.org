## CLI 
### Commands
1. `oni yaml info` (get information on yaml file)
2. `oni export info` (get information on mongoDB export file)
3. `oni generate seed` (generate seed with selected features)

### `oni yaml info`
**Prompt Sequence:**
1. Type: All, Cluster, Asteroid, Trait, Creature, Building
2. Filter: DLC
3. Display: Schema, Value
4. Optional Save

### `oni export info`
**Prompt Sequence:**
1. Dlc
2. Game Mode
3. Starting Cluster
4. Geyser
5. Trait
6. Optional Save (also print url for further inspection)
or
1. Generate test data
or
1. Sort by total geyser count/trait count

Possible useful filters for finding specific seed and counting number of seeds that matches 

### `oni generate seed`
**Prompt Sequence:**
1. Dlc
2. Game Mode
3. Starting Cluster
4. Trait (vanilla)
5. Trait per asteroid (spaced out) 
