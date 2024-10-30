import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";
import { parseCommand } from "./commands/parse.ts"

await new Command()
  .name("oni")
  .description("Command line interface for parsing oni files")
  .action(function () {
    // If no arguments or options are provided, show help
    this.showHelp();
  })
  // Add different commands
  .command("parse", parseCommand)
  .parse(Deno.args);