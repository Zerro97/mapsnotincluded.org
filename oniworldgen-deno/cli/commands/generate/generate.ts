import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";

export const generateCommand = new Command()
  .name("parse")
  .description("Generate seed given trait or generate trait given seed")
  .action(function () {
    // If no arguments or options are provided, show help
    this.showHelp();
  })
