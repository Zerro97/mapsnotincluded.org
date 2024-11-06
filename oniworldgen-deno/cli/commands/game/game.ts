import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";
import { parseSubCommand } from "./sub_command/parse.ts";
import { infoSubCommand } from "./sub_command/info.ts";

export const gameCommand = new Command()
  .name("game")
  .description(
    "Parse oni yaml files",
  )
  .action(function () {
    // If no arguments or options are provided, show help
    this.showHelp();
  })
  .command("info", infoSubCommand)
  .command("parse", parseSubCommand);
