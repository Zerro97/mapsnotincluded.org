import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";

export const seedSubCommand = new Command()
  .name("seed")
  .description("Generate seed given list of traits")
  .option(
    "--trait <name:trait>",
    "Specify list of traits to generate seed",
  )
  .option(
    "--test",
    "Output json useful for testing",
  )
  .action(async (options) => {
  });
