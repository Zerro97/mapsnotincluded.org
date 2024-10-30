import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";

export const parseCommand = new Command()
  .name("parse")
  .description("Parse oni yaml files and generate json files")
  .option(
    "-p, --path <path:string>", 
    "The base location of the game. ex. C:\\Program Files (x86)\\Steam\\steamapps\\common\\OxygenNotIncluded", 
    { required: true }
  )
  .action(function () {
    // If no arguments or options are provided, show help
    this.showHelp();
  })