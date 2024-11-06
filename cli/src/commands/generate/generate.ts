import { Command } from "@cliffy/command";
import { seedSubCommand } from "./sub_command/seed.ts";
import { traitSubCommand } from "./sub_command/trait.ts";

export const generateCommand = new Command()
  .name("parse")
  .description("Generate seed given trait or generate trait given seed")
  .action(function () {
    // If no arguments or options are provided, show help
    this.showHelp();
  })
  .command("seed", seedSubCommand)
  .command("trait", traitSubCommand);
