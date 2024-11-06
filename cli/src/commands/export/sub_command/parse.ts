import { Command } from "cliffy/command/mod.ts";

export const parseSubCommand = new Command()
  .name("parse")
  .description("Parse mongoDB export data and generate json file")
  .action(() => {
  });
