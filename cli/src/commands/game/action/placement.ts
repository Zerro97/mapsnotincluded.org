import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";

export const parsePlacementCommand = new Command()
  .name("all")
  .description("Parse oni yaml files and generate json files")
  .action(function () {
    // If no arguments or options are provided, show help
    this.showHelp();
  });
