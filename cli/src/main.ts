import { Command } from "@cliffy/command";
import { yamlCommand } from "./commands/yaml/yaml.ts";
import { exportCommand } from "/src/commands/export/export.ts";
import { generateCommand } from "/src/commands/generate/generate.ts";

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
  .command("yaml", yamlCommand)
  .command("export", exportCommand)
  .command("generate", generateCommand)
  .parse(Deno.args);
