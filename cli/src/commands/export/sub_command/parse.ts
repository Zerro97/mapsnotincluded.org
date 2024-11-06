import { Command } from "@cliffy/command";

export const parseSubCommand = new Command()
  .name("parse")
  .description("Parse mongoDB export data and generate json file")
  .action(() => {
  });
