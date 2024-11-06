import { Command } from "@cliffy/command";
import { infoSubCommand } from "./sub_command/info.ts";
import { parseSubCommand } from "./sub_command/parse.ts";

export const exportCommand = new Command()
  .name("export")
  .description(
    "Parse mongoDB export file",
  )
  .action(function () {
    // If no arguments or options are provided, show help
    this.showHelp();
  })
  .command("info", infoSubCommand)
  .command("parse", parseSubCommand);
