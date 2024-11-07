import { Command } from "@cliffy/command";
import { infoSubCommand } from "./sub_command/info.ts";

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
