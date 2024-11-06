import { Command } from "@cliffy/command";

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
  });
