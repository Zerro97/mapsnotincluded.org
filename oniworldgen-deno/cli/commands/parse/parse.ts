import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";
import { parseExportCommand } from "./sub_command/export.ts";
import { parseGameCommand } from "./sub_command/game.ts";

export const parseCommand = new Command()
  .name("parse")
  .description("Parse either mongoDB export or oni yaml files and generate json file")
  .action(function () {
    // If no arguments or options are provided, show help
    this.showHelp();
  })
  .command("game", parseGameCommand)
  .command("export", parseExportCommand)
