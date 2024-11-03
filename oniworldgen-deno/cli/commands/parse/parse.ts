import { Command, EnumType } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";
import { parseExportCommand } from "./sub_command/export.ts";
import { parseGameCommand } from "./sub_command/game.ts";

const filter = new EnumType(["all", "cluster", "placement", "trait", "world"]);

export const parseCommand = new Command()
  .name("parse")
  .description("Parse either mongoDB export or oni yaml files and generate json file")
  .action(function () {
    // If no arguments or options are provided, show help
    this.showHelp();
  })
  // For registering enum type for option
  .type("filter", filter)
  // Options that are applicable for all sub commands
  .option(
    "-k, --key",
    "Output json containing unique set of key strings",
  )
  .option(
    "-t, --test",
    "Output json useful for testing",
  )
  .option(
    "-l, --level <level:integer>",
    "For selecting depth of yaml/json file",
    { default: 1 }
  )
  .option(
    "-c, --count",
    "For counting number of matching data",
  )
  .option(
    "-f, --filter <name: filter>",
    "For filtering the data",
    { default: "all" }
  )
  .command("game", parseGameCommand)
  .command("export", parseExportCommand)
