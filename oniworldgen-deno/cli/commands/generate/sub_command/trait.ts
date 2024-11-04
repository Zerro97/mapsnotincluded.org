import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";

export const traitSubCommand = new Command()
  .name("trait")
  .description("Generate trait given a seed")
  .option(
    "--seed <name:seed>",
    "Specify seed to generate traits",
  )
  .option(
    "--test",
    "Output json useful for testing",
  )
  .action(async (options) => {
    
  })
