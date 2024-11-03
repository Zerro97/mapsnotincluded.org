import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";
import { parseCommand } from "./commands/parse/parse.ts";
import { infoCommand } from "./commands/info/info.ts";
import { generateCommand } from "./commands/generate/generate.ts";

await new Command()
  .name("oni")
  .description(
    "Command line interface for parsing oni files. Currently only supports windows and mac.",
  )
  .version("0.1.0")
  .action(function () {
    // If no arguments or options are provided, show help
    this.showHelp();
  })
  // Add different commands
  .command("info", infoCommand)
  .command("parse", parseCommand)
  .command("generate", generateCommand)
  .parse(Deno.args);
