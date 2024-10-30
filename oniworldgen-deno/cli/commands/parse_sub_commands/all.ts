import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";
import { parse, stringify } from "@std/yaml";
import gamePath from "/cli/utils/game_path.ts"

export const parseAllCommand = new Command()
  .name("all")
  .description("Parse oni yaml files and generate json files")
  .option(
    "-p, --path <path:string>",
    "The base location of the game. ex. C:\\Program Files (x86)\\Steam\\steamapps\\common\\OxygenNotIncluded",
    { required: true },
  )
  .action(function () {
    // If no arguments or options are provided, show help
    this.showHelp();
  });


// export const generateData = (gamePath: string) => {
//   let data = {};

//   for (let worldgenPath of worldgenPaths) {
//     const traitsPath = `${worldgenPath.path}\\traits`;
//     data[worldgenPath.id] = { traits: {} };

//     if (fs.existsSync(traitsPath)) {
//       const files = fs.readdirSync(traitsPath);
//       for (let file of files) {
//         let trait = yaml.parse(
//           fs.readFileSync(`${worldgenPath.path}\\traits\\${file}`, "utf8"),
//         );
//         data[worldgenPath.id]
//           .traits[worldgenPath.traitsPrefix + file.replace(".yaml", "")] =
//             trait;
//       }
//     }

//     const worldPath = `${worldgenPath.path}\\worlds`;
//     data[worldgenPath.id].worlds = {};
//     if (fs.existsSync(worldPath)) {
//       const files = fs.readdirSync(worldPath);
//       for (let file of files) {
//         let world = yaml.parse(
//           fs.readFileSync(`${worldgenPath.path}\\worlds\\${file}`, "utf8"),
//         );
//         data[worldgenPath.id].worlds[file.replace(".yaml", "")] = world;
//       }
//     }

//     const clustersPath = `${worldgenPath.path}\\clusters`;
//     data[worldgenPath.id].clusters = {};
//     if (fs.existsSync(clustersPath)) {
//       const files = fs.readdirSync(clustersPath);
//       for (let file of files) {
//         console.log(file);
//         // Some clusters fail due to bad yaml, (Namely bigemptycluster....)
//         try {
//           let cluster = yaml.parse(
//             fs.readFileSync(`${worldgenPath.path}\\clusters\\${file}`, "utf8"),
//           );
//           data[worldgenPath.id].clusters[file.replace(".yaml", "")] = cluster;
//           // TODO: Skip editor only? I guess not since that would be down to whatever is consuming this
//         } catch (e) {
//           console.error(e);
//         }
//       }
//     }
//   }

//   return data;
// };
