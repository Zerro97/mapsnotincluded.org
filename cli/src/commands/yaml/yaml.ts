import { Command } from "@cliffy/command";
import { parseSubCommand } from "./sub_command/parse.ts";
import { infoSubCommand } from "./sub_command/info.ts";

export const yamlCommand = new Command()
  .name("yaml")
  .description(
    "Parse oni yaml files",
  )
  .action(function () {
    this.showHelp();
  })
  .command("info", infoSubCommand)
  .command("parse", parseSubCommand);
