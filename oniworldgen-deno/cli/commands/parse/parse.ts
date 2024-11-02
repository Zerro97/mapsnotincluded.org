import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";
import { parseAllCommand } from "./parse_sub_commands/all.ts";
import { parseClusterCommand } from "./parse_sub_commands/cluster.ts";
import { parsePlacementCommand } from "./parse_sub_commands/placement.ts";
import { parseTraitCommand } from "./parse_sub_commands/trait.ts";
import { parseWorldCommand } from "./parse_sub_commands/world.ts";

export const parseCommand = new Command()
  .name("parse")
  .description("Parse oni yaml files and generate json files")
  .option(
    "-p, --path <path:string>",
    "The base location of the game. ex. C:\\Program Files (x86)\\Steam\\steamapps\\common\\OxygenNotIncluded",
    { required: true },
  )
  .action(function () {
    // If no arguments or options are provided, show help
    this.showHelp();
  })
  .command("all", parseAllCommand)
  .command("trait", parseTraitCommand)
  .command("world", parseWorldCommand)
  .command("cluster", parseClusterCommand)
  .command("placement", parsePlacementCommand);
