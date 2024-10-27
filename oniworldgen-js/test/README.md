## Seed Components
Current game seed is composed of 5 sections. For instance, below is a sample seed and its format:

- `SNDST-C-1845874684-CHDB7-D3-DH`
- `{Cluster}-{Seed}-{Game Setting}-{Story Trait}-{Scramble DLC}`

---

For detailed explanation of each part of the seed, you can refer to [wiki](https://oxygennotincluded.wiki.gg/wiki/Guide/Worldgen_Seeds)

## Asteroid Order in Spaced Out
In Spaced Out DLC, there are multiple asteroids associated with one cluster, whereas in vanilla base game only one asteroid is associated with one cluster.

In Spaced Out DLC, each of the asteroids have their own world traits. When generating traits from a seed, the order of asteroid in a cluster matters. Check out `utils/asteroidOrder.json` for the ordering of the asteroids in a cluster
