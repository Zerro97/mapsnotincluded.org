import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";
import { parseAllCommand } from "./action/all.ts";
import { parseClusterCommand } from "./action/cluster.ts";
import { parsePlacementCommand } from "./action/placement.ts";
import { parseTraitCommand } from "./action/trait.ts";
import { parseWorldCommand } from "./action/world.ts";

export const infoCommand = new Command()
  .name("parse")
  .description("Parse either mongoDB export or oni yaml files and output on console")
  .action(function () {
    // If no arguments or options are provided, show help
    this.showHelp();
  })
  // Options that are applicable for all sub commands
  .option(
    "-k, --key <key:string>",
    "Output json containing unique set of key strings",
  )
  .option(
    "-t, --test <test:string>",
    "Output json useful for testing",
  )
  .option(
    "-l, --level <level:string>",
    "For selecting depth of yaml/json file",
  )
  .option(
    "-c, --count <count:string>",
    "For counting number of matching data",
  )
  .option(
    "-f, --filter <filter:string>",
    "For filtering the data",
  )