import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";
import { exportSubCommand } from "./sub_command/export.ts";
import { gameSubCommand } from "./sub_command/game.ts";

export const infoCommand = new Command()
  .name("info")
  .description("Parse either mongoDB export or oni yaml files and output to console")
  .action(function () {
    // If no arguments or options are provided, show help
    this.showHelp();
  })
  .command("game", gameSubCommand)
  .command("export", exportSubCommand)
